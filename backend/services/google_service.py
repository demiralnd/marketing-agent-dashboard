import random
from datetime import datetime, timedelta

def get_google_insights():
    """Returns mock Google Ads data compatible with Tremor Charts"""
    data = []
    today = datetime.now()
    for i in range(7):
        date_str = (today - timedelta(days=6-i)).strftime("%Y-%m-%d")
        data.append({
            "date": date_str,
            "Spend": random.randint(150, 600),
            "ROAS": round(random.uniform(2.0, 5.0), 2),
            "Clicks": random.randint(80, 300),
            "Conversions": random.randint(5, 50)
        })
    return data

def get_google_campaign_summary():
    """Returns detailed Google Ads campaign performance"""
    campaigns = ["Search - Brand", "Search - Generic", "Display Network", "Shopping", "YouTube"]
    data = []
    for campaign in campaigns:
        data.append({
            "campaign": campaign,
            "impressions": random.randint(15000, 150000),
            "clicks": random.randint(800, 8000),
            "spend": round(random.uniform(150, 1500), 2),
            "cpc": round(random.uniform(0.3, 3.0), 2),
            "ctr": round(random.uniform(1.5, 6.0), 2),
            "conversions": random.randint(20, 600),
            "roas": round(random.uniform(2.0, 8.0), 2),
            "quality_score": random.randint(5, 10)
        })
    return data

def get_keyword_performance():
    """Returns top keyword performance data"""
    keywords = [
        "marketing automation",
        "digital advertising",
        "social media ads",
        "ppc management",
        "google ads optimization"
    ]
    data = []
    for keyword in keywords:
        data.append({
            "keyword": keyword,
            "impressions": random.randint(5000, 50000),
            "clicks": random.randint(100, 2000),
            "cpc": round(random.uniform(1.0, 5.0), 2),
            "position": round(random.uniform(1.0, 4.0), 1),
            "quality_score": random.randint(6, 10)
        })
    return data
