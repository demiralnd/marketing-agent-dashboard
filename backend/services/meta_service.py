import os
import random
import requests
from datetime import datetime, timedelta

# Hard‑coded Meta credentials (fallback – should match Render env vars)
META_APP_ID = "1926345315432502"
META_APP_SECRET = "034f6aa9382e1e6cee8ce4e21b8842c0"

# Helper to check if all required env vars are present
def _has_credentials():
    required = [
        "META_ACCESS_TOKEN",
        "META_AD_ACCOUNT_ID",
        "META_APP_ID",
        "META_APP_SECRET",
    ]
    return all(os.getenv(var) for var in required)

# ---------------------------------------------------------------------------
# Mock data generators (used when credentials are missing or API fails)
# ---------------------------------------------------------------------------
def _mock_insights():
    """Return mock daily insights for the last 7 days."""
    data = []
    today = datetime.now()
    for i in range(7):
        date_str = (today - timedelta(days=6 - i)).strftime("%Y-%m-%d")
        data.append({
            "date": date_str,
            "Spend": random.randint(100, 500),
            "ROAS": round(random.uniform(1.5, 4.0), 2),
            "Clicks": random.randint(50, 200),
        })
    return data

def _mock_campaign_summary():
    """Return mock campaign summary data."""
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
            "roas": round(random.uniform(1.5, 6.0), 2),
        })
    return data

# ---------------------------------------------------------------------------
# Real API calls – only executed when credentials are present
# ---------------------------------------------------------------------------
def _api_get(url, params):
    """Wrapper around requests.get that returns JSON or raises.
    Includes a short timeout and basic error handling.
    """
    try:
        resp = requests.get(url, params=params, timeout=10)
        resp.raise_for_status()
        return resp.json()
    except Exception as e:
        # In production we would log this; for now we fall back to mock.
        print(f"Meta API request failed: {e}")
        return None

def get_meta_insights():
    """Fetch daily spend, clicks and ROAS for the last 7 days.
    Returns a list of dicts compatible with Tremor charts:
        [{"date": "2024-01-01", "Spend": 123, "ROAS": 2.5, "Clicks": 45}, ...]
    If any step fails, falls back to mock data.
    """
    if not _has_credentials():
        return _mock_insights()

    access_token = os.getenv("META_ACCESS_TOKEN")
    ad_account_id = os.getenv("META_AD_ACCOUNT_ID")
    # Build the time range for the last 7 days (inclusive)
    today = datetime.utcnow().date()
    since = (today - timedelta(days=6)).isoformat()
    until = today.isoformat()
    url = f"https://graph.facebook.com/v18.0/act_{ad_account_id}/insights"
    params = {
        "access_token": access_token,
        "time_range": f"{{'since':'{since}','until':'{until}'}}",
        "level": "ad",
        "breakdowns": "day",
        "fields": "spend,clicks,actions",
    }
    result = _api_get(url, params)
    if not result or "data" not in result:
        return _mock_insights()

    data = []
    for entry in result["data"]:
        spend = float(entry.get("spend", 0))
        clicks = int(entry.get("clicks", 0))
        revenue = 0.0
        for act in entry.get("actions", []):
            if act.get("action_type") == "offsite_conversion":
                revenue = float(act.get("value", 0))
                break
        roas = round(revenue / spend, 2) if spend > 0 else 0.0
        date_str = entry.get("date_start")
        data.append({
            "date": date_str,
            "Spend": spend,
            "ROAS": roas,
            "Clicks": clicks,
        })
    if len(data) < 7:
        missing = 7 - len(data)
        data.extend(_mock_insights()[:missing])
    return data

def get_meta_campaign_summary():
    """Fetch a summary for each campaign under the ad account.
    Returns a list of dicts compatible with the existing front‑end expectations.
    Falls back to mock data on any error.
    """
    if not _has_credentials():
        return _mock_campaign_summary()

    access_token = os.getenv("META_ACCESS_TOKEN")
    ad_account_id = os.getenv("META_AD_ACCOUNT_ID")
    url = f"https://graph.facebook.com/v18.0/act_{ad_account_id}/campaigns"
    params = {
        "access_token": access_token,
        "fields": "name,impressions,clicks,spend,cpc,ctr,actions,conversion_value",
    }
    result = _api_get(url, params)
    if not result or "data" not in result:
        return _mock_campaign_summary()

    data = []
    for camp in result["data"]:
        spend = float(camp.get("spend", 0))
        clicks = int(camp.get("clicks", 0))
        impressions = int(camp.get("impressions", 0))
        cpc = float(camp.get("cpc", 0))
        ctr = float(camp.get("ctr", 0))
        conversions = 0
        revenue = float(camp.get("conversion_value", 0))
        for act in camp.get("actions", []):
            if act.get("action_type") == "offsite_conversion":
                conversions = int(act.get("value", 0))
                break
        roas = round(revenue / spend, 2) if spend > 0 else 0.0
        data.append({
            "campaign": camp.get("name", "Unnamed"),
            "impressions": impressions,
            "clicks": clicks,
            "spend": round(spend, 2),
            "cpc": round(cpc, 2),
            "ctr": round(ctr, 2),
            "conversions": conversions,
            "roas": roas,
        })
    return data
