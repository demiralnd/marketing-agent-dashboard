import os
from typing import Optional, Dict, Any
# from dotenv import load_dotenv
# import google.generativeai as genai

# load_dotenv()

# Configure Gemini (uncomment when API key is available)
# genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

SYSTEM_PROMPT = """You are a marketing analytics AI assistant. You help users understand their advertising performance across Meta (Facebook/Instagram) and Google Ads.

You can:
1. Analyze ad performance metrics (ROAS, CTR, CPC, Conversions)
2. Compare performance across platforms
3. Provide insights and recommendations
4. Help optimize ad spend

When users ask about their ads, determine if they want:
- Meta/Facebook/Instagram data -> use meta_performance_chart
- Google Ads data -> use google_performance_chart
- Comparison data -> use comparison_chart
- Campaign details -> use campaign_table

Always be concise, data-driven, and actionable in your responses."""

def detect_intent(message: str) -> Dict[str, Any]:
    """
    Detects user intent and returns appropriate tool call.
    This is a simplified version - in production, use Gemini for intent detection.
    """
    msg_lower = message.lower()
    
    # Meta/Facebook/Instagram keywords
    meta_keywords = ["meta", "facebook", "instagram", "fb", "ig"]
    # Google keywords
    google_keywords = ["google", "search", "youtube", "display", "shopping", "ppc"]
    # Comparison keywords
    comparison_keywords = ["compare", "comparison", "both", "all", "versus", "vs"]
    # Campaign keywords
    campaign_keywords = ["campaign", "campaigns", "breakdown", "detail", "details"]
    # Performance keywords
    performance_keywords = ["performance", "how", "doing", "results", "metrics", "roi", "roas"]
    
    # Check for comparison first
    if any(kw in msg_lower for kw in comparison_keywords):
        return {
            "tool_call": "comparison_chart",
            "platforms": ["meta", "google"],
            "intent": "comparison"
        }
    
    # Check for campaign details
    if any(kw in msg_lower for kw in campaign_keywords):
        if any(kw in msg_lower for kw in google_keywords):
            return {
                "tool_call": "google_campaign_table",
                "platform": "google",
                "intent": "campaign_details"
            }
        elif any(kw in msg_lower for kw in meta_keywords):
            return {
                "tool_call": "meta_campaign_table",
                "platform": "meta",
                "intent": "campaign_details"
            }
        return {
            "tool_call": "all_campaigns_table",
            "platforms": ["meta", "google"],
            "intent": "all_campaign_details"
        }
    
    # Check for specific platform
    if any(kw in msg_lower for kw in meta_keywords):
        return {
            "tool_call": "meta_performance_chart",
            "platform": "meta",
            "intent": "meta_performance"
        }
    
    if any(kw in msg_lower for kw in google_keywords):
        return {
            "tool_call": "google_performance_chart",
            "platform": "google",
            "intent": "google_performance"
        }
    
    # Default: general help
    return {
        "tool_call": None,
        "intent": "general_help"
    }

def generate_response(message: str, intent: Dict[str, Any]) -> str:
    """
    Generate appropriate response based on intent.
    In production, this would use Gemini for natural language generation.
    """
    intent_type = intent.get("intent", "general_help")
    
    responses = {
        "meta_performance": "Here's your Meta Ads performance data for the last 7 days. I'm showing you daily spend, ROAS, and click trends.",
        "google_performance": "Here's your Google Ads performance overview. The chart shows spend, ROAS, clicks, and conversion trends over the past week.",
        "comparison": "I've prepared a side-by-side comparison of your Meta and Google Ads performance. This will help you understand which platform is delivering better results.",
        "campaign_details": "Here's a detailed breakdown of your campaign performance with key metrics like impressions, clicks, CTR, and ROAS.",
        "all_campaign_details": "Here's an overview of all your campaigns across both Meta and Google Ads platforms.",
        "general_help": "I can help you analyze your advertising performance! Try asking:\n• \"How is Meta performing?\"\n• \"Show me Google Ads results\"\n• \"Compare my ad platforms\"\n• \"Show campaign breakdown\""
    }
    
    return responses.get(intent_type, responses["general_help"])
