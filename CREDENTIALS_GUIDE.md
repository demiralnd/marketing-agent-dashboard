# 🔐 Credentials Setup Guide

## Required Credentials

### 1. Google OAuth (Optional - for Google Sign-In)

**Steps to get Google OAuth credentials:**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" → "Credentials"
4. Click "Create Credentials" → "OAuth client ID"
5. Select "Web application"
6. Add authorized redirect URIs:
   - Development: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://your-domain.com/api/auth/callback/google`
7. Copy your **Client ID** and **Client Secret**

**Add to `.env.local`:**
```env
GOOGLE_CLIENT_ID=your-client-id-here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret-here
```

### 2. NextAuth Secret

Generate a secure secret key:

```bash
openssl rand -base64 32
```

**Add to `.env.local`:**
```env
NEXTAUTH_SECRET=your-generated-secret-here
NEXTAUTH_URL=http://localhost:3000
```

### 3. Backend API URL

For local development, this is already set:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

For production, update to your deployed backend URL.

---

## Quick Start (Demo Mode)

The app works **without any credentials** using demo authentication:

**Demo Login Credentials:**
- Email: `demo@marketing.ai`
- Password: `demo123`

---

## Meta Ads API (For Real Data - Future)

To connect real Meta Ads data:

1. Go to [Meta for Developers](https://developers.facebook.com/)
2. Create an app
3. Add "Marketing API" product
4. Get your **Access Token** and **Ad Account ID**
5. Update backend `.env` file

---

## Google Ads API (For Real Data - Future)

To connect real Google Ads data:

1. Go to [Google Ads API](https://developers.google.com/google-ads/api/docs/start)
2. Apply for API access
3. Set up OAuth2 credentials
4. Get your **Developer Token**, **Client ID**, **Client Secret**, and **Refresh Token**
5. Update backend `.env` file

---

## Current Status

✅ **Working Now:**
- Demo authentication (no credentials needed)
- Mock data for Meta & Google Ads
- All chart visualizations
- PDF/CSV exports
- Modern light design

🔜 **Coming Soon:**
- Google OAuth sign-in
- Real Meta Ads API integration
- Real Google Ads API integration

---

## Environment Files

### Frontend (`.env.local`)
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend (`.env`)
```env
# Future: Meta Ads
META_ACCESS_TOKEN=your-token
META_AD_ACCOUNT_ID=act_123456

# Future: Google Ads
GOOGLE_ADS_DEVELOPER_TOKEN=your-token
GOOGLE_ADS_CLIENT_ID=your-client-id
GOOGLE_ADS_CLIENT_SECRET=your-secret
GOOGLE_ADS_REFRESH_TOKEN=your-refresh-token
GOOGLE_ADS_CUSTOMER_ID=123-456-7890

# Future: Gemini AI
GEMINI_API_KEY=your-gemini-key
```

---

## Testing Without Credentials

Just run the app and use:
- **Email**: demo@marketing.ai
- **Password**: demo123

All features work with mock data!
