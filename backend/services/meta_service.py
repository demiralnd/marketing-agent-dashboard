import random
from datetime import datetime, timedelta

def get_meta_insights():
    """Returns mock data compatible with Tremor Charts"""
    data = []
    today = datetime.now()
    for i in range(7):
        date_str = (today - timedelta(days=6-i)).strftime("%Y-%m-%d")
        data.append({
            "date": date_str,
            "Spend": random.randint(100, 500),
            "ROAS": round(random.uniform(1.5, 4.0), 2),
            "Clicks": random.randint(50, 200)
        })
    return data

def get_meta_campaign_summary():
    """Returns detailed campaign performance summary"""
    campaigns = ["Brand Awareness", "Lead Generation", "Conversions", "Traffic"]
    data = []
    for campaign in campaigns:
        data.append({
            "campaign": campaign,
            "impressions": random.randint(10000, 100000),
            "clicks": random.randint(500, 5000),
            "spend": round(random.uniform(100, 1000), 2),
            "cpc": round(random.uniform(0.5, 2.5), 2),
            "ctr": round(random.uniform(1.0, 5.0), 2),
            "conversions": random.randint(10, 500),
            "roas": round(random.uniform(1.5, 6.0), 2)
        })
    return data
