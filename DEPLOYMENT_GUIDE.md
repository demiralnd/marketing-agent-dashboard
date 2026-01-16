# 🚀 Deployment Guide - Marketing Agent Dashboard

## ✅ Current Status
Your application is **fully functional** locally with:
- ✅ Modern, premium UI with brand color `#6a9dbe`
- ✅ Working authentication (demo mode)
- ✅ Beautiful Nivo charts
- ✅ Clean, simplified welcome screen
- ✅ Export functionality (PDF/CSV)

---

## 📋 **EASIEST DEPLOYMENT PATH: Vercel (Frontend) + Render (Backend)**

This is the **simplest and fastest** way to deploy your application with minimal configuration.

---

## 🎯 **Step 1: Deploy Backend to Render.com**

### Why Render?
- ✅ Free tier available
- ✅ Automatic Docker deployment
- ✅ Easy environment variable management
- ✅ No credit card required for free tier

### Instructions:

1. **Create a Render Account**
   - Go to https://render.com
   - Sign up with GitHub (recommended)

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the `marketing-agent-root/backend` directory

3. **Configure the Service**
   ```
   Name: marketing-agent-backend
   Region: Choose closest to your users
   Branch: main (or your default branch)
   Root Directory: marketing-agent-root/backend
   Runtime: Docker
   Instance Type: Free
   ```

4. **Add Environment Variables** (Click "Advanced" → "Add Environment Variable")
   ```
   PORT=8000
   ENVIRONMENT=production
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait 3-5 minutes for deployment
   - Copy your backend URL (e.g., `https://marketing-agent-backend.onrender.com`)

---

## 🎯 **Step 2: Deploy Frontend to Vercel**

### Why Vercel?
- ✅ Built by Next.js creators (perfect compatibility)
- ✅ Free tier with generous limits
- ✅ Automatic HTTPS
- ✅ Zero configuration needed
- ✅ Instant deployments

### Instructions:

1. **Install Vercel CLI** (Optional - you can also use the web interface)
   ```bash
   npm i -g vercel
   ```

2. **Deploy via Web Interface** (Easiest)
   - Go to https://vercel.com
   - Sign up with GitHub
   - Click "Add New" → "Project"
   - Import your repository
   - Select `marketing-agent-root/frontend` as the root directory
   - Vercel will auto-detect Next.js

3. **Configure Environment Variables**
   In Vercel dashboard → Settings → Environment Variables, add:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
   ```
   (Replace with your Render backend URL from Step 1)

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your app will be live at `https://your-app.vercel.app`

---

## 🔐 **Step 3: Configure Meta & Google Ads Credentials**

### **Option A: Meta Ads API (Facebook/Instagram)**

#### 1. Create Meta App
- Go to https://developers.facebook.com/apps
- Click "Create App"
- Select "Business" type
- Fill in app details

#### 2. Get Access Token
- In your app dashboard, go to "Tools" → "Graph API Explorer"
- Select your app
- Add permissions:
  - `ads_read`
  - `ads_management`
  - `business_management`
- Generate Access Token
- **Important**: Convert to Long-Lived Token (60 days)
  ```bash
  curl -i -X GET "https://graph.facebook.com/v18.0/oauth/access_token?grant_type=fb_exchange_token&client_id=YOUR_APP_ID&client_secret=YOUR_APP_SECRET&fb_exchange_token=YOUR_SHORT_TOKEN"
  ```

#### 3. Get Ad Account ID
- Go to https://business.facebook.com/settings/ad-accounts
- Copy your Ad Account ID (format: `act_XXXXXXXXXX`)

#### 4. Add to Backend Environment Variables (Render)
```
META_ACCESS_TOKEN=your_long_lived_token
META_AD_ACCOUNT_ID=act_XXXXXXXXXX
```

---

### **Option B: Google Ads API**

#### 1. Create Google Cloud Project
- Go to https://console.cloud.google.com
- Create new project
- Enable "Google Ads API"

#### 2. Create OAuth 2.0 Credentials
- Go to "APIs & Services" → "Credentials"
- Click "Create Credentials" → "OAuth 2.0 Client ID"
- Application type: "Web application"
- Add authorized redirect URI: `http://localhost:8000/oauth2callback`
- Download JSON credentials

#### 3. Get Developer Token
- Go to https://ads.google.com/aw/apicenter
- Apply for developer token (approval may take 24-48 hours)

#### 4. Get Refresh Token
Run this script in your backend directory:
```python
# get_google_refresh_token.py
from google_auth_oauthlib.flow import InstalledAppFlow

SCOPES = ['https://www.googleapis.com/auth/adwords']

flow = InstalledAppFlow.from_client_secrets_file(
    'client_secrets.json', SCOPES)
credentials = flow.run_local_server(port=8080)

print(f'Refresh Token: {credentials.refresh_token}')
```

Run it:
```bash
pip install google-auth-oauthlib
python get_google_refresh_token.py
```

#### 5. Add to Backend Environment Variables (Render)
```
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REFRESH_TOKEN=your_refresh_token
GOOGLE_DEVELOPER_TOKEN=your_developer_token
GOOGLE_CUSTOMER_ID=your_customer_id (without dashes)
```

---

## 🔧 **Step 4: Update Backend Code to Use Real APIs**

### Current State
Your backend currently returns **mock data**. To use real APIs:

1. **Install Required Packages**
   ```bash
   cd marketing-agent-root/backend
   pip install facebook-business google-ads
   pip freeze > requirements.txt
   ```

2. **Update `services/meta_service.py`**
   ```python
   from facebook_business.api import FacebookAdsApi
   from facebook_business.adobjects.adaccount import AdAccount
   import os

   # Initialize API
   FacebookAdsApi.init(
       access_token=os.getenv('META_ACCESS_TOKEN')
   )

   def get_meta_performance():
       account = AdAccount(os.getenv('META_AD_ACCOUNT_ID'))
       insights = account.get_insights(
           fields=['spend', 'impressions', 'clicks', 'actions'],
           params={'time_range': {'since': '2024-01-01', 'until': '2024-01-31'}}
       )
       return insights
   ```

3. **Update `services/google_service.py`**
   ```python
   from google.ads.googleads.client import GoogleAdsClient
   import os

   # Initialize client
   client = GoogleAdsClient.load_from_dict({
       'developer_token': os.getenv('GOOGLE_DEVELOPER_TOKEN'),
       'client_id': os.getenv('GOOGLE_CLIENT_ID'),
       'client_secret': os.getenv('GOOGLE_CLIENT_SECRET'),
       'refresh_token': os.getenv('GOOGLE_REFRESH_TOKEN'),
       'use_proto_plus': True
   })

   def get_google_performance():
       ga_service = client.get_service("GoogleAdsService")
       query = """
           SELECT campaign.id, campaign.name, metrics.clicks, metrics.cost_micros
           FROM campaign
           WHERE segments.date DURING LAST_30_DAYS
       """
       response = ga_service.search(
           customer_id=os.getenv('GOOGLE_CUSTOMER_ID'),
           query=query
       )
       return response
   ```

---

## 🔐 **Step 5: Production Authentication (Optional)**

### Current State
You're using **demo authentication** with `sessionStorage`. For production:

### Option 1: NextAuth.js with Google OAuth (Recommended)

1. **Update `.env.local`** (already exists)
   ```
   GOOGLE_CLIENT_ID=your_oauth_client_id
   GOOGLE_CLIENT_SECRET=your_oauth_client_secret
   NEXTAUTH_SECRET=your_random_secret_string
   NEXTAUTH_URL=https://your-app.vercel.app
   ```

2. **The auth route is already set up** at `app/api/auth/[...nextauth]/route.ts`

3. **Update `app/login/page.tsx`** to use real Google OAuth:
   ```tsx
   import { signIn } from "next-auth/react";
   
   // Replace the Google Sign-In button onClick:
   onClick={() => signIn('google', { callbackUrl: '/' })}
   ```

### Option 2: Keep Demo Mode
If you want to keep it simple for now, the current demo authentication works fine for testing and internal use.

---

## 📊 **Testing Your Deployment**

### 1. Test Backend
```bash
curl https://your-backend-url.onrender.com/health
# Should return: {"status": "healthy"}
```

### 2. Test Frontend
- Visit your Vercel URL
- Login with demo credentials
- Send a test query: "How is Meta performing today?"
- Verify charts render correctly

### 3. Test Real API Integration
- Once you've added Meta/Google credentials
- Send queries and verify real data appears

---

## 🎉 **You're Done!**

Your application is now:
- ✅ Deployed to production
- ✅ Accessible via HTTPS
- ✅ Ready for real API integration
- ✅ Scalable and professional

### **Costs**
- **Render (Backend)**: FREE (with 750 hours/month)
- **Vercel (Frontend)**: FREE (with generous limits)
- **Total**: $0/month for moderate usage

### **Next Steps**
1. Add custom domain (optional)
2. Set up monitoring (Vercel Analytics is free)
3. Configure Meta/Google APIs when ready
4. Share with your team!

---

## 🆘 **Need Help?**

### Common Issues:

**Backend won't start on Render:**
- Check logs in Render dashboard
- Verify Dockerfile is correct
- Ensure PORT environment variable is set

**Frontend can't connect to backend:**
- Verify `NEXT_PUBLIC_API_URL` is set correctly
- Check CORS settings in backend
- Ensure backend is running (check Render dashboard)

**Charts not rendering:**
- Check browser console for errors
- Verify API response format matches expected structure
- Test with demo data first

---

## 📝 **Summary: Easiest Path**

1. **5 minutes**: Deploy backend to Render (free)
2. **3 minutes**: Deploy frontend to Vercel (free)
3. **2 minutes**: Connect them via environment variable
4. **Later**: Add Meta/Google credentials when ready

**Total time to live app: ~10 minutes** ⚡

No credit card, no complex configuration, no DevOps knowledge required!
