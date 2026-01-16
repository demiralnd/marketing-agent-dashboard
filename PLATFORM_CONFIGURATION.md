# ⚙️ Platform Configuration Guide

Complete configuration details for deploying to Render and Vercel.

---

## 🎨 **Render.com Configuration (Backend)**

### 1. Service Settings

#### Basic Configuration
```yaml
Service Type: Web Service
Name: marketing-agent-backend
Region: Oregon (US West) or closest to your users
Branch: main
Root Directory: marketing-agent-root/backend
```

#### Build & Deploy Settings
```yaml
Runtime: Docker
Dockerfile Path: ./Dockerfile (auto-detected)
Docker Context: ./
Docker Command: (leave empty - uses CMD from Dockerfile)
```

#### Instance Settings
```yaml
Instance Type: Free
  - 512 MB RAM
  - 0.1 CPU
  - Shared
  - Spins down after 15 min inactivity
  - Spins up on request (cold start ~30s)

# For Production (Optional Upgrade):
Instance Type: Starter ($7/month)
  - 512 MB RAM
  - 0.5 CPU
  - Always on (no cold starts)
  - Better performance
```

---

### 2. Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

#### Required Variables:
```bash
# Server Configuration
PORT=8000
ENVIRONMENT=production

# Optional: Use mock data (remove when adding real APIs)
USE_MOCK_DATA=true
```

#### Optional: Meta Ads API
```bash
META_ACCESS_TOKEN=your_long_lived_access_token_here
META_AD_ACCOUNT_ID=act_123456789
```

#### Optional: Google Ads API
```bash
GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REFRESH_TOKEN=your_refresh_token
GOOGLE_DEVELOPER_TOKEN=your_developer_token
GOOGLE_CUSTOMER_ID=1234567890
```

#### Optional: Additional Settings
```bash
# CORS Configuration (if needed)
ALLOWED_ORIGINS=https://your-app.vercel.app,https://your-custom-domain.com

# Logging
LOG_LEVEL=INFO

# API Rate Limiting
RATE_LIMIT_PER_MINUTE=60
```

---

### 3. Health Check Configuration

Render automatically uses:
```yaml
Health Check Path: /health
Expected Status: 200
Interval: 30 seconds
Timeout: 10 seconds
Unhealthy Threshold: 3
Healthy Threshold: 2
```

Your backend already has this endpoint configured in `main.py`:
```python
@app.get("/health")
async def health_check():
    return {"status": "healthy"}
```

---

### 4. Auto-Deploy Settings

```yaml
Auto-Deploy: Yes (recommended)
  - Deploys automatically on git push to main branch
  - Build logs available in dashboard
  - Rollback available if deployment fails

Branch: main
  - Change this if you use a different branch (e.g., production)
```

---

### 5. Build Command (Docker)

Render automatically runs:
```bash
docker build -t marketing-agent-backend .
docker run -p 8000:8000 marketing-agent-backend
```

Your `Dockerfile` handles:
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

---

### 6. Networking & Security

```yaml
# Automatic HTTPS
SSL Certificate: Auto-generated (Let's Encrypt)
HTTPS Redirect: Enabled by default

# Firewall
Inbound: HTTPS (443), HTTP (80) - auto-redirected to HTTPS
Outbound: All traffic allowed (for API calls)

# DDoS Protection
Included in all plans

# Custom Domain (Optional)
Add in: Settings → Custom Domains
Point CNAME to: your-service.onrender.com
SSL: Auto-generated
```

---

### 7. Monitoring & Logs

```yaml
# Logs
Access: Dashboard → Logs tab
Retention: 7 days (Free), 30 days (Paid)
Real-time: Yes
Download: Yes

# Metrics (Paid plans)
CPU Usage: Available
Memory Usage: Available
Request Count: Available
Response Time: Available
Error Rate: Available
```

---

### 8. Scaling Configuration

#### Free Tier:
```yaml
Instances: 1
Auto-scaling: No
Manual scaling: No
```

#### Paid Tiers:
```yaml
# Starter ($7/month)
Instances: 1
Auto-scaling: No
Always on: Yes

# Standard ($25/month)
Instances: 1-10
Auto-scaling: Yes
Scaling Rules:
  - CPU > 80% → Scale up
  - CPU < 20% → Scale down
  - Min instances: 1
  - Max instances: 10
```

---

### 9. Backup & Rollback

```yaml
# Automatic Backups
Docker Images: Last 10 builds retained
Rollback: One-click to previous deployment

# Manual Rollback
1. Go to Dashboard → Deploys
2. Find previous successful deploy
3. Click "Redeploy"
```

---

## 🚀 **Vercel Configuration (Frontend)**

### 1. Project Settings

#### Basic Configuration
```yaml
Framework Preset: Next.js (auto-detected)
Root Directory: marketing-agent-root/frontend
Build Command: npm run build
Output Directory: .next
Install Command: npm install
Node.js Version: 18.x (auto-detected from package.json)
```

#### Advanced Build Settings
```yaml
# Override Build Command (if needed)
Build Command: npm run build

# Override Install Command (if needed)
Install Command: npm ci

# Override Output Directory (if needed)
Output Directory: .next

# Ignore Build Step (optional)
Ignore Command: git diff --quiet HEAD^ HEAD ./frontend/
```

---

### 2. Environment Variables

Click **"Settings"** → **"Environment Variables"**

#### Production Environment:
```bash
# Backend API URL (REQUIRED)
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com

# Note: Must start with NEXT_PUBLIC_ to be accessible in browser
# Do NOT include trailing slash
```

#### Optional: NextAuth.js (Production Auth)
```bash
# Google OAuth
GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_client_secret

# NextAuth Configuration
NEXTAUTH_SECRET=your_random_secret_string_min_32_chars
NEXTAUTH_URL=https://your-app.vercel.app

# Note: Generate NEXTAUTH_SECRET with:
# openssl rand -base64 32
```

#### Environment-Specific Variables:
```yaml
Production: Used for production deployments
Preview: Used for preview deployments (PRs)
Development: Used for local development (not needed on Vercel)

# Example: Different API URLs per environment
Production: NEXT_PUBLIC_API_URL=https://api.yourapp.com
Preview: NEXT_PUBLIC_API_URL=https://api-staging.yourapp.com
Development: NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

### 3. Deployment Settings

```yaml
# Git Integration
Auto-Deploy: Yes (recommended)
Production Branch: main
  - Deploys to production URL
  - Custom domain (if configured)

Preview Branches: All branches
  - Creates preview URL for each branch
  - Format: branch-name-project.vercel.app
  - Automatic cleanup after merge

Pull Request Comments: Yes
  - Posts preview URL in PR comments
  - Shows deployment status
```

---

### 4. Build & Development Settings

```yaml
# Framework
Framework: Next.js
Version: 15.x (from package.json)

# Node.js
Version: 18.x (recommended)
Package Manager: npm (auto-detected)

# Build Configuration
Build Command: npm run build
  - Runs: next build
  - Optimizes production bundle
  - Generates static pages

Output Directory: .next
  - Contains optimized build
  - Served by Vercel Edge Network
```

---

### 5. Performance & Caching

```yaml
# Edge Network
CDN: Global (300+ locations)
Cache: Automatic for static assets
TTL: 31536000s (1 year) for immutable assets

# Image Optimization
Enabled: Yes (automatic)
Formats: WebP, AVIF (automatic conversion)
Sizes: Responsive (automatic)
Lazy Loading: Yes

# Compression
Gzip: Yes
Brotli: Yes (better compression)

# Headers
Cache-Control: Automatic
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
```

---

### 6. Custom Domain Configuration

#### Add Custom Domain:
```yaml
1. Go to: Settings → Domains
2. Add domain: yourdomain.com
3. Configure DNS:

# Option A: CNAME (Recommended)
Type: CNAME
Name: www (or @)
Value: cname.vercel-dns.com

# Option B: A Record
Type: A
Name: @
Value: 76.76.21.21

# SSL Certificate
Auto-generated: Yes (Let's Encrypt)
Renewal: Automatic
HTTPS Redirect: Yes (automatic)
```

---

### 7. Security Headers

Vercel automatically adds:
```yaml
# Security Headers
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()

# Custom Headers (if needed)
Add in: vercel.json
```

Example `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Custom-Header",
          "value": "my-value"
        }
      ]
    }
  ]
}
```

---

### 8. Analytics & Monitoring

```yaml
# Vercel Analytics (Free)
Enable: Settings → Analytics → Enable
Metrics:
  - Page views
  - Unique visitors
  - Top pages
  - Referrers
  - Devices
  - Countries

# Web Vitals (Free)
Metrics:
  - Largest Contentful Paint (LCP)
  - First Input Delay (FID)
  - Cumulative Layout Shift (CLS)
  - Time to First Byte (TTFB)

# Speed Insights (Paid - $10/month)
  - Real user monitoring
  - Performance scores
  - Detailed metrics
```

---

### 9. Serverless Functions

Your Next.js API routes automatically become serverless functions:

```yaml
# Configuration
Runtime: Node.js 18.x
Region: Automatic (closest to user)
Timeout: 10s (Free), 60s (Pro)
Memory: 1024 MB (Free), 3008 MB (Pro)

# Example: /app/api/auth/[...nextauth]/route.ts
Becomes: https://your-app.vercel.app/api/auth/...
```

---

### 10. Preview Deployments

```yaml
# Automatic Previews
Every git push: Creates preview URL
Format: git-branch-name-project.vercel.app

# Features:
- Unique URL per branch
- Automatic SSL
- Same as production (but with preview env vars)
- Comments on PRs with preview link
- Password protection (optional)

# Password Protection (Optional)
Settings → Deployment Protection
Enable: Yes
Password: your-password
Applies to: Preview deployments only
```

---

## 🔧 **Advanced Configuration**

### Render: Custom Dockerfile

If you need to customize the Docker build:

```dockerfile
# Dockerfile (already configured)
FROM python:3.11-slim

# Install system dependencies (if needed)
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD python -c "import requests; requests.get('http://localhost:8000/health')"

# Run application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

---

### Vercel: Advanced Next.js Config

`next.config.js` (already configured):

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Output standalone for optimal performance
  output: 'standalone',
  
  // Image optimization
  images: {
    domains: ['your-image-cdn.com'],
    formats: ['image/avif', 'image/webp'],
  },
  
  // Compression
  compress: true,
  
  // React strict mode
  reactStrictMode: true,
  
  // Environment variables validation
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  
  // Headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
        ],
      },
    ]
  },
  
  // Redirects
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
```

---

## 📊 **Resource Limits**

### Render Free Tier:
```yaml
RAM: 512 MB
CPU: 0.1 (shared)
Bandwidth: Unlimited
Build Time: 15 minutes max
Concurrent Builds: 1
Disk Space: 1 GB
Monthly Hours: 750 (spins down after 15 min)
```

### Vercel Free Tier:
```yaml
Bandwidth: 100 GB/month
Serverless Function Executions: 100 GB-hours
Build Execution: 100 hours/month
Deployments: Unlimited
Team Members: 1
Custom Domains: Unlimited
```

---

## 🔐 **Security Best Practices**

### Environment Variables:
```yaml
✅ DO:
- Use environment variables for all secrets
- Use NEXT_PUBLIC_ prefix for client-side vars only
- Rotate tokens regularly
- Use different values for production/preview

❌ DON'T:
- Commit .env files to git
- Hardcode secrets in code
- Share secrets in public channels
- Use same credentials for dev/prod
```

### API Security:
```yaml
✅ Implement:
- CORS restrictions
- Rate limiting
- API key validation
- HTTPS only
- Input validation

❌ Avoid:
- Exposing internal errors
- Allowing all origins
- No rate limiting
- Verbose error messages
```

---

## 🎯 **Configuration Checklist**

### Render Setup:
- [ ] Service created with correct settings
- [ ] Docker runtime selected
- [ ] Root directory set to `marketing-agent-root/backend`
- [ ] Environment variables added
- [ ] Health check endpoint verified
- [ ] Auto-deploy enabled
- [ ] Deployment successful
- [ ] Backend URL copied

### Vercel Setup:
- [ ] Project imported from GitHub
- [ ] Framework auto-detected as Next.js
- [ ] Root directory set to `marketing-agent-root/frontend`
- [ ] `NEXT_PUBLIC_API_URL` environment variable added
- [ ] Build command verified
- [ ] Auto-deploy enabled
- [ ] Deployment successful
- [ ] Frontend URL copied

### Testing:
- [ ] Frontend loads correctly
- [ ] Backend health check responds
- [ ] Login works
- [ ] Charts render
- [ ] Export functions work
- [ ] No console errors

---

## 🆘 **Common Configuration Issues**

### Issue: "Build Failed" on Render
```yaml
Solution:
1. Check Dockerfile exists in backend folder
2. Verify requirements.txt is complete
3. Check Python version (3.11)
4. Review build logs for specific errors
5. Ensure PORT environment variable is set
```

### Issue: "Build Failed" on Vercel
```yaml
Solution:
1. Check package.json exists in frontend folder
2. Verify all dependencies are listed
3. Check Node.js version compatibility
4. Review build logs
5. Ensure NEXT_PUBLIC_API_URL is set
```

### Issue: "CORS Error" in Browser
```yaml
Solution:
1. Add CORS middleware in backend main.py:

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-app.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

2. Redeploy backend
3. Clear browser cache
```

### Issue: "Environment Variable Not Found"
```yaml
Solution:
1. Verify variable name is correct
2. Check it's added in correct environment (Production/Preview)
3. Redeploy after adding variables
4. For Vercel: Ensure NEXT_PUBLIC_ prefix for client-side vars
```

---

## 📝 **Configuration Templates**

### Render Environment Variables Template:
```bash
# Copy this to Render dashboard
PORT=8000
ENVIRONMENT=production
USE_MOCK_DATA=true
META_ACCESS_TOKEN=
META_AD_ACCOUNT_ID=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REFRESH_TOKEN=
GOOGLE_DEVELOPER_TOKEN=
GOOGLE_CUSTOMER_ID=
```

### Vercel Environment Variables Template:
```bash
# Copy this to Vercel dashboard
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_SECRET=
NEXTAUTH_URL=https://your-app.vercel.app
```

---

## ✅ **You're All Set!**

With these configurations, your application will:
- ✅ Deploy automatically on git push
- ✅ Scale automatically based on traffic
- ✅ Have HTTPS enabled
- ✅ Be monitored for health
- ✅ Have optimized performance
- ✅ Be secure and production-ready

**Now follow `QUICK_DEPLOY.md` to deploy!** 🚀
