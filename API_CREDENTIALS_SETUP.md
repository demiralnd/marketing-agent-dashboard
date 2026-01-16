# 🔑 Quick API Credentials Setup

## 📱 **Meta Ads API - 5 Minute Setup**

### Step 1: Create Meta App (2 min)
1. Go to: https://developers.facebook.com/apps
2. Click "Create App" → Select "Business"
3. Name: "Marketing Agent"
4. Click "Create App"

### Step 2: Get Access Token (2 min)
1. In app dashboard → Tools → Graph API Explorer
2. Select your app from dropdown
3. Click "Permissions" → Add:
   - `ads_read`
   - `ads_management`
4. Click "Generate Access Token"
5. **Copy the token** (save it somewhere safe)

### Step 3: Convert to Long-Lived Token (1 min)
```bash
curl "https://graph.facebook.com/v18.0/oauth/access_token?grant_type=fb_exchange_token&client_id=YOUR_APP_ID&client_secret=YOUR_APP_SECRET&fb_exchange_token=YOUR_SHORT_TOKEN"
```
- Find APP_ID and APP_SECRET in app dashboard → Settings → Basic
- Replace YOUR_SHORT_TOKEN with token from Step 2
- **Copy the new access_token from response**

### Step 4: Get Ad Account ID (30 sec)
1. Go to: https://business.facebook.com/settings/ad-accounts
2. Copy your Ad Account ID (looks like `act_123456789`)

### Step 5: Add to Render Environment Variables
```
META_ACCESS_TOKEN=your_long_lived_token_here
META_AD_ACCOUNT_ID=act_123456789
```

---

## 🔍 **Google Ads API - 10 Minute Setup**

### Step 1: Create Google Cloud Project (3 min)
1. Go to: https://console.cloud.google.com
2. Click "Select a project" → "New Project"
3. Name: "Marketing Agent"
4. Click "Create"

### Step 2: Enable Google Ads API (1 min)
1. In your project, go to "APIs & Services" → "Library"
2. Search "Google Ads API"
3. Click "Enable"

### Step 3: Create OAuth Credentials (3 min)
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth 2.0 Client ID"
3. If prompted, configure consent screen:
   - User Type: External
   - App name: "Marketing Agent"
   - Add your email
   - Save
4. Application type: "Desktop app"
5. Name: "Marketing Agent Desktop"
6. Click "Create"
7. **Download JSON** (save as `client_secrets.json`)

### Step 4: Get Developer Token (2 min)
1. Go to: https://ads.google.com/aw/apicenter
2. Click "Apply for access"
3. Fill out form (approval takes 24-48 hours)
4. Once approved, copy your developer token

### Step 5: Get Refresh Token (2 min)
1. Save this script as `get_token.py` in your backend folder:

```python
from google_auth_oauthlib.flow import InstalledAppFlow

SCOPES = ['https://www.googleapis.com/auth/adwords']

flow = InstalledAppFlow.from_client_secrets_file(
    'client_secrets.json', SCOPES)
credentials = flow.run_local_server(port=8080)

print(f'\n✅ Refresh Token: {credentials.refresh_token}\n')
```

2. Run it:
```bash
pip install google-auth-oauthlib
python get_token.py
```

3. Browser will open → Sign in with Google → Allow access
4. **Copy the refresh token** from terminal

### Step 6: Get Customer ID (30 sec)
1. Go to: https://ads.google.com
2. Look at top right corner for your Customer ID (10 digits, no dashes)
3. Example: `1234567890`

### Step 7: Add to Render Environment Variables
```
GOOGLE_CLIENT_ID=your_client_id_from_json
GOOGLE_CLIENT_SECRET=your_client_secret_from_json
GOOGLE_REFRESH_TOKEN=your_refresh_token_from_step5
GOOGLE_DEVELOPER_TOKEN=your_developer_token_from_step4
GOOGLE_CUSTOMER_ID=1234567890
```

---

## ⚡ **Super Quick Test (No Real APIs)**

If you just want to deploy and test without setting up APIs yet:

### Backend Environment Variables (Render)
```
PORT=8000
ENVIRONMENT=production
USE_MOCK_DATA=true
```

### Frontend Environment Variables (Vercel)
```
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
```

This will use the existing mock data and you can add real APIs later!

---

## 🎯 **Priority Order**

### For Testing/Demo:
1. ✅ Deploy with mock data (5 min)
2. ✅ Share with team
3. ⏳ Add real APIs later

### For Production:
1. ✅ Set up Meta API first (easier, 5 min)
2. ✅ Deploy and test with Meta data
3. ⏳ Add Google Ads later (requires approval)

---

## 📋 **Checklist**

### Meta Ads Setup
- [ ] Created Meta app
- [ ] Generated access token
- [ ] Converted to long-lived token
- [ ] Got Ad Account ID
- [ ] Added to Render environment variables
- [ ] Tested API connection

### Google Ads Setup
- [ ] Created Google Cloud project
- [ ] Enabled Google Ads API
- [ ] Created OAuth credentials
- [ ] Applied for developer token
- [ ] Got refresh token
- [ ] Got Customer ID
- [ ] Added to Render environment variables
- [ ] Tested API connection

### Deployment
- [ ] Backend deployed to Render
- [ ] Frontend deployed to Vercel
- [ ] Environment variables configured
- [ ] Tested end-to-end flow
- [ ] Verified charts render correctly

---

## 🆘 **Troubleshooting**

### "Invalid Access Token" (Meta)
- Token expired → Generate new long-lived token
- Missing permissions → Add `ads_read` and `ads_management`

### "Authentication Failed" (Google)
- Developer token not approved → Wait for approval or use test account
- Wrong Customer ID → Remove dashes, use 10 digits only
- Refresh token expired → Generate new one with `get_token.py`

### "CORS Error" (Frontend)
- Add to backend `main.py`:
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-app.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## ✅ **You're Ready!**

Follow the main `DEPLOYMENT_GUIDE.md` for complete deployment instructions.

This guide focused on the **credentials setup** - the most confusing part for most developers.

**Estimated time:**
- Meta setup: 5-10 minutes
- Google setup: 10-15 minutes (+ 24-48h for approval)
- Deployment: 10 minutes

**Total active time: ~30 minutes** 🚀
