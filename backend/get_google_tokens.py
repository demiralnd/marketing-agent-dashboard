
import os
import json
from google_auth_oauthlib.flow import InstalledAppFlow

def get_tokens():
    print("---------------------------------------------------------") 
    print("🔑 Google Ads API Token Generator")
    print("---------------------------------------------------------")
    print("Since I couldn't auto-retrieve your keys, let's do it quickly manually.")
    print("Please go to: https://console.cloud.google.com/apis/credentials")
    print("Look for your 'OAuth 2.0 Client ID'.\n")
    
    client_id = input("1. Paste your CLIENT ID here: ").strip()
    client_secret = input("2. Paste your CLIENT SECRET here: ").strip()
    
    if not client_id or not client_secret:
        print("\n❌ Error: Both Client ID and Client Secret are required.")
        return

    # Create a temporary client_secrets.json
    client_config = {
        "installed": {
            "client_id": client_id,
            "project_id": "marketing-agent",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_secret": client_secret,
            "redirect_uris": ["http://localhost:8080"]
        }
    }
    
    with open("temp_client_secrets.json", "w") as f:
        json.dump(client_config, f)
        
    print("\n---------------------------------------------------------")
    print("🚀 Launching browser for OAuth verification...")
    print("---------------------------------------------------------")
    
    try:
        # Define scopes
        SCOPES = ['https://www.googleapis.com/auth/adwords']
        
        flow = InstalledAppFlow.from_client_secrets_file(
            'temp_client_secrets.json', SCOPES)
            
        credentials = flow.run_local_server(port=8080)
        
        print("\n✅ SUCCESS! Here are your credentials:")
        print("---------------------------------------------------------")
        print(f"GOOGLE_CLIENT_ID={client_id}")
        print(f"GOOGLE_CLIENT_SECRET={client_secret}")
        print(f"GOOGLE_REFRESH_TOKEN={credentials.refresh_token}")
        print("---------------------------------------------------------")
        print("👉 Copy these 3 lines and add them to Render Environment Variables.")
        
    except Exception as e:
        print(f"\n❌ Error during authentication: {e}")
        
    finally:
        if os.path.exists("temp_client_secrets.json"):
            os.remove("temp_client_secrets.json")

if __name__ == "__main__":
    get_tokens()
