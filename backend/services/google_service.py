import os
import random
from datetime import datetime, timedelta
from google.ads.googleads.client import GoogleAdsClient
from google.ads.googleads.errors import GoogleAdsException

# Mock Data Generators (Fallbacks)
def _get_mock_google_insights():
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

def _get_mock_google_campaign_summary():
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

def _get_mock_keyword_performance():
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

# Real API Client Configuration
def get_google_ads_client():
    try:
        credentials = {
            "developer_token": os.getenv("GOOGLE_DEVELOPER_TOKEN"),
            "refresh_token": os.getenv("GOOGLE_REFRESH_TOKEN"),
            "client_id": os.getenv("GOOGLE_CLIENT_ID"),
            "client_secret": os.getenv("GOOGLE_CLIENT_SECRET"),
            "use_proto_plus": True
        }
        
        # Check if any credential is missing
        if not all(credentials.values()):
            return None
            
        return GoogleAdsClient.load_from_dict(credentials)
    except Exception as e:
        print(f"Error initializing Google Ads client: {e}")
        return None

def get_google_insights():
    if os.getenv("USE_MOCK_DATA", "true").lower() == "true":
        return _get_mock_google_insights()

    client = get_google_ads_client()
    customer_id = os.getenv("GOOGLE_CUSTOMER_ID")
    
    if not client or not customer_id:
        print("Google Ads credentials missing, using mock data")
        return _get_mock_google_insights()

    ga_service = client.get_service("GoogleAdsService")
    
    query = """
        SELECT 
            segments.date,
            metrics.cost_micros,
            metrics.clicks,
            metrics.conversions,
            metrics.conversions_value
        FROM customer
        WHERE segments.date DURING LAST_7_DAYS
        ORDER BY segments.date ASC
    """

    try:
        response = ga_service.search_stream(customer_id=customer_id, query=query)
        data = []
        
        for batch in response:
            for row in batch.results:
                spend = row.metrics.cost_micros / 1000000
                conversion_value = row.metrics.conversions_value
                roas = round(conversion_value / spend, 2) if spend > 0 else 0
                
                data.append({
                    "date": row.segments.date,
                    "Spend": round(spend, 2),
                    "Clicks": row.metrics.clicks,
                    "Conversions": row.metrics.conversions,
                    "ROAS": roas
                })
        
        return data if data else _get_mock_google_insights()
        
    except GoogleAdsException as ex:
        print(f"Google Ads API Request Error: {ex}")
        return _get_mock_google_insights()

def get_google_campaign_summary():
    if os.getenv("USE_MOCK_DATA", "true").lower() == "true":
        return _get_mock_google_campaign_summary()

    client = get_google_ads_client()
    customer_id = os.getenv("GOOGLE_CUSTOMER_ID")
    
    if not client or not customer_id:
        return _get_mock_google_campaign_summary()

    ga_service = client.get_service("GoogleAdsService")
    
    query = """
        SELECT 
            campaign.name,
            metrics.impressions,
            metrics.clicks,
            metrics.cost_micros,
            metrics.average_cpc,
            metrics.ctr,
            metrics.conversions,
            metrics.conversions_value
        FROM campaign
        WHERE segments.date DURING LAST_30_DAYS
        ORDER BY metrics.impressions DESC
        LIMIT 10
    """

    try:
        response = ga_service.search_stream(customer_id=customer_id, query=query)
        data = []
        
        for batch in response:
            for row in batch.results:
                spend = row.metrics.cost_micros / 1000000
                conversion_value = row.metrics.conversions_value
                roas = round(conversion_value / spend, 2) if spend > 0 else 0
                cpc = row.metrics.average_cpc / 1000000
                
                data.append({
                    "campaign": row.campaign.name,
                    "impressions": row.metrics.impressions,
                    "clicks": row.metrics.clicks,
                    "spend": round(spend, 2),
                    "cpc": round(cpc, 2),
                    "ctr": round(row.metrics.ctr * 100, 2),
                    "conversions": row.metrics.conversions,
                    "roas": roas,
                    "quality_score": random.randint(5, 10) # Quality score is keyword level, mocking for campaign
                })
        
        return data if data else _get_mock_google_campaign_summary()
        
    except GoogleAdsException as ex:
        print(f"Google Ads API Request Error: {ex}")
        return _get_mock_google_campaign_summary()

def get_keyword_performance():
    if os.getenv("USE_MOCK_DATA", "true").lower() == "true":
        return _get_mock_keyword_performance()

    client = get_google_ads_client()
    customer_id = os.getenv("GOOGLE_CUSTOMER_ID")
    
    if not client or not customer_id:
        return _get_mock_keyword_performance()

    ga_service = client.get_service("GoogleAdsService")
    
    query = """
        SELECT 
            ad_group_criterion.keyword.text,
            metrics.impressions,
            metrics.clicks,
            metrics.average_cpc,
            metrics.historical_quality_score
        FROM keyword_view
        WHERE segments.date DURING LAST_30_DAYS
        ORDER BY metrics.impressions DESC
        LIMIT 10
    """

    try:
        response = ga_service.search_stream(customer_id=customer_id, query=query)
        data = []
        
        for batch in response:
            for row in batch.results:
                cpc = row.metrics.average_cpc / 1000000
                qs = row.metrics.historical_quality_score
                
                data.append({
                    "keyword": row.ad_group_criterion.keyword.text,
                    "impressions": row.metrics.impressions,
                    "clicks": row.metrics.clicks,
                    "cpc": round(cpc, 2),
                    "position": 0, # Avg position deprecated, mocking or omitting
                    "quality_score": qs if qs else 0
                })
        
        return data if data else _get_mock_keyword_performance()
        
    except GoogleAdsException as ex:
        print(f"Google Ads API Request Error: {ex}")
        return _get_mock_keyword_performance()
