from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import os

from services.meta_service import get_meta_insights, get_meta_campaign_summary
from services.google_service import get_google_insights, get_google_campaign_summary, get_keyword_performance
from services.llm_engine import detect_intent, generate_response

app = FastAPI(
    title="Marketing Agent API",
    description="Unified Marketing Intelligence Agent connecting Meta & Google Ads",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow Vercel/Localhost
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatMessage(BaseModel):
    message: str
    conversation_id: Optional[str] = None

class ChatResponse(BaseModel):
    role: str
    content: str
    tool_call: Optional[str] = None
    data: Optional[Any] = None

@app.get("/")
async def root():
    return {
        "message": "Marketing Agent API is running",
        "version": "1.0.0",
        "endpoints": {
            "chat": "/api/chat",
            "health": "/health"
        }
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(chat: ChatMessage):
    """
    Main chat endpoint for the Marketing Agent.
    Processes user messages, detects intent, and returns appropriate data with visualizations.
    """
    user_msg = chat.message
    
    # Detect intent using LLM engine
    intent = detect_intent(user_msg)
    tool_call = intent.get("tool_call")
    
    # Generate natural language response
    response_content = generate_response(user_msg, intent)
    
    # Get appropriate data based on tool call
    data = None
    
    if tool_call == "meta_performance_chart":
        data = get_meta_insights()
    
    elif tool_call == "google_performance_chart":
        data = get_google_insights()
    
    elif tool_call == "comparison_chart":
        data = {
            "meta": get_meta_insights(),
            "google": get_google_insights()
        }
    
    elif tool_call == "meta_campaign_table":
        data = get_meta_campaign_summary()
    
    elif tool_call == "google_campaign_table":
        data = get_google_campaign_summary()
    
    elif tool_call == "all_campaigns_table":
        data = {
            "meta": get_meta_campaign_summary(),
            "google": get_google_campaign_summary()
        }
    
    return ChatResponse(
        role="assistant",
        content=response_content,
        tool_call=tool_call,
        data=data
    )

@app.get("/api/summary")
async def get_summary():
    """
    Returns a quick summary of both platforms' performance.
    Useful for dashboard overview widgets.
    """
    meta_data = get_meta_insights()
    google_data = get_google_insights()
    
    # Calculate totals
    meta_total_spend = sum(d["Spend"] for d in meta_data)
    meta_avg_roas = sum(d["ROAS"] for d in meta_data) / len(meta_data)
    meta_total_clicks = sum(d["Clicks"] for d in meta_data)
    
    google_total_spend = sum(d["Spend"] for d in google_data)
    google_avg_roas = sum(d["ROAS"] for d in google_data) / len(google_data)
    google_total_clicks = sum(d["Clicks"] for d in google_data)
    
    return {
        "period": "Last 7 days",
        "meta": {
            "total_spend": meta_total_spend,
            "avg_roas": round(meta_avg_roas, 2),
            "total_clicks": meta_total_clicks
        },
        "google": {
            "total_spend": google_total_spend,
            "avg_roas": round(google_avg_roas, 2),
            "total_clicks": google_total_clicks
        },
        "combined": {
            "total_spend": meta_total_spend + google_total_spend,
            "avg_roas": round((meta_avg_roas + google_avg_roas) / 2, 2),
            "total_clicks": meta_total_clicks + google_total_clicks
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
