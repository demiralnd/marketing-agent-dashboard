# ✅ Deployment Checklist - Marketing Agent Dashboard

Use this checklist to track your deployment progress!

---

## 📋 **Pre-Deployment Checklist**

### Local Testing
- [ ] Frontend running at http://localhost:3000
- [ ] Backend running at http://localhost:8000
- [ ] Can login with demo credentials
- [ ] Charts render correctly
- [ ] Export buttons work (PDF/CSV)
- [ ] Quick action buttons work
- [ ] Chat interface responds
- [ ] No console errors

### Code Preparation
- [ ] All changes committed to Git
- [ ] Pushed to GitHub repository
- [ ] `.env.local` file created (not committed)
- [ ] Environment variables documented
- [ ] README.md reviewed

---

## 🚀 **Quick Deploy Checklist** (10 minutes)

### Step 1: Render Setup (5 min)
- [ ] Created Render account
- [ ] Connected GitHub repository
- [ ] Created new Web Service
- [ ] Selected `marketing-agent-root/backend` directory
- [ ] Set runtime to Docker
- [ ] Added environment variables:
  - [ ] `PORT=8000`
  - [ ] `ENVIRONMENT=production`
  - [ ] `USE_MOCK_DATA=true`
- [ ] Clicked "Create Web Service"
- [ ] Deployment successful (check logs)
- [ ] Copied backend URL: `___________________________`

### Step 2: Vercel Setup (5 min)
- [ ] Created Vercel account
- [ ] Connected GitHub repository
- [ ] Imported project
- [ ] Selected `marketing-agent-root/frontend` directory
- [ ] Framework auto-detected as Next.js
- [ ] Added environment variable:
  - [ ] `NEXT_PUBLIC_API_URL` = (backend URL from Step 1)
- [ ] Clicked "Deploy"
- [ ] Deployment successful
- [ ] Copied frontend URL: `___________________________`

### Step 3: Testing (2 min)
- [ ] Visited frontend URL
- [ ] Login page loads correctly
- [ ] Logged in with demo credentials
- [ ] Dashboard loads
- [ ] Asked a test question
- [ ] Charts render correctly
- [ ] Export buttons work

---

## 🔑 **API Integration Checklist** (Optional)

### Meta Ads API Setup
- [ ] Created Meta Developer account
- [ ] Created new app
- [ ] Generated access token
- [ ] Converted to long-lived token
- [ ] Got Ad Account ID
- [ ] Added to Render environment variables:
  - [ ] `META_ACCESS_TOKEN`
  - [ ] `META_AD_ACCOUNT_ID`
- [ ] Updated `backend/services/meta_service.py`
- [ ] Redeployed backend
- [ ] Tested with real Meta data

### Google Ads API Setup
- [ ] Created Google Cloud project
- [ ] Enabled Google Ads API
- [ ] Created OAuth credentials
- [ ] Downloaded client_secrets.json
- [ ] Applied for developer token
- [ ] Got refresh token
- [ ] Got Customer ID
- [ ] Added to Render environment variables:
  - [ ] `GOOGLE_CLIENT_ID`
  - [ ] `GOOGLE_CLIENT_SECRET`
  - [ ] `GOOGLE_REFRESH_TOKEN`
  - [ ] `GOOGLE_DEVELOPER_TOKEN`
  - [ ] `GOOGLE_CUSTOMER_ID`
- [ ] Updated `backend/services/google_service.py`
- [ ] Redeployed backend
- [ ] Tested with real Google data

---

## 🔐 **Production Auth Checklist** (Optional)

### Google OAuth Setup
- [ ] Created Google OAuth credentials
- [ ] Got Client ID and Secret
- [ ] Added to Vercel environment variables:
  - [ ] `GOOGLE_CLIENT_ID`
  - [ ] `GOOGLE_CLIENT_SECRET`
  - [ ] `NEXTAUTH_SECRET`
  - [ ] `NEXTAUTH_URL`
- [ ] Updated `app/login/page.tsx` to use real OAuth
- [ ] Tested Google Sign-In flow
- [ ] Verified redirect to dashboard works

---

## 🎨 **Customization Checklist** (Optional)

### Branding
- [ ] Updated logo in `public/` folder
- [ ] Changed brand color from `#6a9dbe` to: `___________`
- [ ] Updated app name in `layout.tsx`
- [ ] Updated meta description
- [ ] Updated favicon

### Custom Domain
- [ ] Purchased domain: `___________________________`
- [ ] Added domain in Vercel settings
- [ ] Updated DNS records
- [ ] SSL certificate auto-generated
- [ ] Verified domain works

---

## 📊 **Post-Deployment Checklist**

### Monitoring
- [ ] Set up Vercel Analytics (free)
- [ ] Checked Render logs for errors
- [ ] Verified uptime (99.9%+)
- [ ] Tested from different devices
- [ ] Tested from different locations

### Performance
- [ ] Page load < 3 seconds
- [ ] Charts render smoothly
- [ ] No console errors
- [ ] Mobile responsive
- [ ] HTTPS working

### Documentation
- [ ] Updated README with live URLs
- [ ] Documented environment variables
- [ ] Created user guide (if needed)
- [ ] Shared with team

---

## 🎯 **Success Metrics**

### Technical Metrics
- [ ] Uptime: _____ % (target: 99.9%)
- [ ] Page load time: _____ seconds (target: < 3s)
- [ ] API response time: _____ ms (target: < 1s)
- [ ] Error rate: _____ % (target: < 1%)

### Business Metrics
- [ ] Daily active users: _____
- [ ] Queries per day: _____
- [ ] Export downloads: _____
- [ ] User satisfaction: _____ /10

---

## 🆘 **Troubleshooting Checklist**

### If Frontend Won't Deploy:
- [ ] Checked Vercel build logs
- [ ] Verified `package.json` is correct
- [ ] Confirmed Next.js version compatibility
- [ ] Checked environment variables are set
- [ ] Tried manual redeploy

### If Backend Won't Deploy:
- [ ] Checked Render logs
- [ ] Verified Dockerfile exists
- [ ] Confirmed Python version (3.11)
- [ ] Checked `requirements.txt` is complete
- [ ] Verified PORT environment variable

### If Charts Don't Render:
- [ ] Opened browser console (F12)
- [ ] Checked for JavaScript errors
- [ ] Verified API is responding
- [ ] Tested with demo data first
- [ ] Checked Nivo version compatibility

### If API Connection Fails:
- [ ] Verified `NEXT_PUBLIC_API_URL` is correct
- [ ] Checked backend is running
- [ ] Looked for CORS errors
- [ ] Tested backend health endpoint
- [ ] Verified HTTPS (not HTTP)

---

## 📝 **Notes Section**

Use this space to track important information:

**Backend URL**: ___________________________________________

**Frontend URL**: ___________________________________________

**Custom Domain**: ___________________________________________

**Meta Ad Account ID**: ___________________________________________

**Google Customer ID**: ___________________________________________

**Deployment Date**: ___________________________________________

**Last Updated**: ___________________________________________

**Team Members**:
- ___________________________________________
- ___________________________________________
- ___________________________________________

**Important Notes**:
___________________________________________
___________________________________________
___________________________________________
___________________________________________

---

## 🎉 **Completion Status**

### Quick Deploy (Minimum Viable Product)
- [ ] Backend deployed to Render
- [ ] Frontend deployed to Vercel
- [ ] Basic testing completed
- [ ] **READY TO SHARE!** 🚀

### Full Production (Complete Setup)
- [ ] Quick deploy completed
- [ ] Meta Ads API integrated
- [ ] Google Ads API integrated
- [ ] Production auth enabled
- [ ] Custom domain configured
- [ ] **PRODUCTION READY!** 🎊

### Advanced (Optional Enhancements)
- [ ] Custom branding applied
- [ ] Analytics set up
- [ ] Monitoring configured
- [ ] User guide created
- [ ] Team trained
- [ ] **ENTERPRISE READY!** 🏆

---

## 📅 **Timeline Tracker**

| Task | Estimated | Actual | Status |
|------|-----------|--------|--------|
| Local testing | 10 min | _____ | ⬜ |
| Render deploy | 5 min | _____ | ⬜ |
| Vercel deploy | 5 min | _____ | ⬜ |
| Basic testing | 5 min | _____ | ⬜ |
| Meta API setup | 10 min | _____ | ⬜ |
| Google API setup | 15 min | _____ | ⬜ |
| Production auth | 10 min | _____ | ⬜ |
| Custom domain | 15 min | _____ | ⬜ |
| **TOTAL** | **75 min** | **_____** | ⬜ |

---

## 🎯 **Next Actions**

### Today:
1. ___________________________________________
2. ___________________________________________
3. ___________________________________________

### This Week:
1. ___________________________________________
2. ___________________________________________
3. ___________________________________________

### This Month:
1. ___________________________________________
2. ___________________________________________
3. ___________________________________________

---

## ✅ **Final Sign-Off**

- [ ] All critical features tested
- [ ] No blocking bugs
- [ ] Documentation complete
- [ ] Team notified
- [ ] Ready for users

**Deployed by**: ___________________________________________

**Date**: ___________________________________________

**Signature**: ___________________________________________

---

**Congratulations on your deployment!** 🎉

Keep this checklist for future reference and updates.
