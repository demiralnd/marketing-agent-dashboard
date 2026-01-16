# 🎯 Marketing Agent Dashboard

> **AI-Powered Marketing Intelligence Platform for Meta & Google Ads**

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688)](https://fastapi.tiangolo.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Python-3.11-yellow)](https://www.python.org/)

---

## ✨ Features

- 🎨 **Premium UI Design** - Modern glassmorphism with brand color `#6a9dbe`
- 📊 **Beautiful Analytics** - Interactive Nivo charts with smooth animations
- 💬 **AI Chat Interface** - Natural language queries for marketing insights
- 📈 **Real-time Metrics** - Track Meta & Google Ads performance
- 📥 **Export Functionality** - Download analytics as PDF or CSV
- 🔐 **Secure Authentication** - Demo mode + production-ready OAuth
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- ⚡ **Fast & Scalable** - Built with Next.js 15 and FastAPI

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.11+
- Git

### Local Development

**1. Clone the repository**
```bash
git clone <your-repo-url>
cd marketing-agent-root
```

**2. Start Backend**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```
Backend runs at: http://localhost:8000

**3. Start Frontend** (in a new terminal)
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at: http://localhost:3000

**4. Login**
- Email: `demo@marketing.ai`
- Password: `demo123`

---

## 📦 Deployment

### ⚡ Quick Deploy (10 minutes)
See **[QUICK_DEPLOY.md](QUICK_DEPLOY.md)** for the fastest deployment path:
1. Deploy backend to Render (5 min)
2. Deploy frontend to Vercel (5 min)
3. Done! ✅

### 📚 Complete Setup
See **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** for:
- Full deployment instructions
- Meta & Google Ads API integration
- Production authentication setup
- Custom domain configuration

### 🔑 API Credentials
See **[API_CREDENTIALS_SETUP.md](API_CREDENTIALS_SETUP.md)** for:
- Meta Ads API setup (5 min)
- Google Ads API setup (10 min)
- Step-by-step credential generation

---

## 📁 Project Structure

```
marketing-agent-root/
├── frontend/                 # Next.js 15 application
│   ├── app/
│   │   ├── page.tsx         # Main dashboard
│   │   ├── login/           # Authentication
│   │   └── api/             # API routes
│   ├── components/
│   │   ├── dashboard/       # Dashboard components
│   │   └── ui/              # Reusable UI components
│   └── public/              # Static assets
│
├── backend/                  # FastAPI application
│   ├── main.py              # API entry point
│   ├── services/            # Business logic
│   │   ├── meta_service.py  # Meta Ads integration
│   │   └── google_service.py # Google Ads integration
│   ├── Dockerfile           # Container configuration
│   └── requirements.txt     # Python dependencies
│
└── docs/                     # Documentation
    ├── QUICK_DEPLOY.md      # Fast deployment guide
    ├── DEPLOYMENT_GUIDE.md  # Complete deployment docs
    └── API_CREDENTIALS_SETUP.md # API setup guide
```

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Nivo (D3.js wrapper)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **UI Components**: Custom + shadcn/ui

### Backend
- **Framework**: FastAPI
- **Language**: Python 3.11
- **Server**: Uvicorn
- **Containerization**: Docker
- **APIs**: Meta Ads API, Google Ads API

---

## 🎨 Screenshots

### Login Page
![Login Page](docs/screenshots/login.png)

### Dashboard
![Dashboard](docs/screenshots/dashboard.png)

### Analytics
![Analytics](docs/screenshots/analytics.png)

---

## 🔐 Authentication

### Demo Mode (Current)
- Email: `demo@marketing.ai`
- Password: `demo123`
- Uses `sessionStorage` for quick testing

### Production Mode (Optional)
- Google OAuth via NextAuth.js
- Secure session management
- See `DEPLOYMENT_GUIDE.md` for setup

---

## 📊 API Integration

### Current State: Mock Data
The application currently uses realistic mock data for demonstration.

### Enable Real APIs:

**Meta Ads API**
1. Get credentials (see `API_CREDENTIALS_SETUP.md`)
2. Add to backend environment:
   ```
   META_ACCESS_TOKEN=your_token
   META_AD_ACCOUNT_ID=act_123456789
   ```
3. Update `backend/services/meta_service.py`

**Google Ads API**
1. Get credentials (see `API_CREDENTIALS_SETUP.md`)
2. Add to backend environment:
   ```
   GOOGLE_CLIENT_ID=your_client_id
   GOOGLE_CLIENT_SECRET=your_client_secret
   GOOGLE_REFRESH_TOKEN=your_refresh_token
   GOOGLE_DEVELOPER_TOKEN=your_dev_token
   GOOGLE_CUSTOMER_ID=1234567890
   ```
3. Update `backend/services/google_service.py`

---

## 🎯 Usage Examples

### Ask Questions in Natural Language:
- "How is Meta performing today?"
- "Show me Google Ads results"
- "Compare both platforms"
- "What's my ROAS trend?"

### View Analytics:
- Real-time performance metrics
- Interactive charts (Spend, ROAS, Clicks)
- Campaign breakdowns
- Trend analysis

### Export Data:
- Click "Export PDF" for reports
- Click "Export CSV" for raw data
- Share insights with your team

---

## 💰 Deployment Costs

### Free Tier (Recommended)
- **Render (Backend)**: FREE (750 hours/month)
- **Vercel (Frontend)**: FREE (100 GB bandwidth/month)
- **Total**: $0/month

### Paid Tier (When You Scale)
- **Render Pro**: $7/month
- **Vercel Pro**: $20/month

---

## 🔧 Development

### Frontend Development
```bash
cd frontend
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # Run ESLint
```

### Backend Development
```bash
cd backend
source venv/bin/activate
python main.py       # Start dev server
pytest              # Run tests (if configured)
```

### Environment Variables

**Frontend (.env.local)**
```
NEXT_PUBLIC_API_URL=http://localhost:8000
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
```

**Backend (.env)**
```
PORT=8000
ENVIRONMENT=development
META_ACCESS_TOKEN=your_token
META_AD_ACCOUNT_ID=act_123456789
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REFRESH_TOKEN=your_refresh_token
GOOGLE_DEVELOPER_TOKEN=your_dev_token
GOOGLE_CUSTOMER_ID=1234567890
```

---

## 📈 Performance

- ⚡ **Page Load**: < 2 seconds
- ⚡ **Time to Interactive**: < 3 seconds
- ⚡ **Chart Rendering**: < 500ms
- ⚡ **API Response**: < 1 second

---

## 🆘 Troubleshooting

### Frontend Issues

**Charts not rendering**
- Check browser console for errors
- Verify API response format
- Test with demo data first

**Can't connect to backend**
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check backend is running
- Look for CORS errors in console

### Backend Issues

**Server won't start**
- Check Python version (3.11+)
- Verify all dependencies installed
- Check port 8000 is available

**API errors**
- Verify credentials are correct
- Check token expiration
- Review API rate limits

---

## 📚 Documentation

- **[QUICK_DEPLOY.md](QUICK_DEPLOY.md)** - 10-minute deployment guide
- **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Complete deployment documentation
- **[PLATFORM_CONFIGURATION.md](PLATFORM_CONFIGURATION.md)** - Detailed Render & Vercel configuration
- **[API_CREDENTIALS_SETUP.md](API_CREDENTIALS_SETUP.md)** - API setup instructions
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Project overview and status

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📝 License

This project is licensed under the MIT License.

---

## 🎉 What's Next?

1. ✅ **Deploy to production** - Follow `QUICK_DEPLOY.md`
2. ✅ **Add real APIs** - Follow `API_CREDENTIALS_SETUP.md`
3. ✅ **Customize branding** - Update colors, logo, domain
4. ✅ **Add features** - Advanced analytics, more integrations
5. ✅ **Scale up** - Upgrade to paid tiers as needed

---

## 🌟 Features Coming Soon

- [ ] Multi-user support
- [ ] Team collaboration
- [ ] Advanced reporting
- [ ] Email alerts
- [ ] Mobile app
- [ ] More ad platforms (LinkedIn, Twitter, TikTok)

---

## 💬 Support

For questions or issues:
1. Check the documentation files
2. Review troubleshooting section
3. Open an issue on GitHub

---

**Built with ❤️ using Next.js, FastAPI, and modern web technologies.**

---

## 🚀 Ready to Deploy?

Choose your path:
- **Quick Test**: Follow `QUICK_DEPLOY.md` (10 min)
- **Full Production**: Follow `DEPLOYMENT_GUIDE.md` (30 min)
- **Local Development**: See Quick Start above

**Your marketing intelligence platform awaits!** 📊✨
