#!/bin/bash

# Marketing Agent Dashboard - Automated Deployment Script
# This script will guide you through the deployment process

set -e  # Exit on error

echo "🚀 Marketing Agent Dashboard - Automated Deployment"
echo "=================================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Check Git status
echo -e "${BLUE}Step 1: Checking Git repository...${NC}"
if [ ! -d .git ]; then
    echo "Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit: Marketing Agent Dashboard"
fi
echo -e "${GREEN}✓ Git repository ready${NC}"
echo ""

# Step 2: GitHub setup
echo -e "${BLUE}Step 2: GitHub Repository Setup${NC}"
echo "Please create a GitHub repository and provide the URL"
echo "Example: https://github.com/yourusername/marketing-agent.git"
echo ""
# Auto-detect GitHub URL
GITHUB_URL=$(git remote get-url origin 2>/dev/null)

if [ -z "$GITHUB_URL" ]; then
    read -p "Enter your GitHub repository URL: " GITHUB_URL
else
    echo -e "${GREEN}✓ Found GitHub repository: $GITHUB_URL${NC}"
fi

if [ ! -z "$GITHUB_URL" ]; then
    echo "Adding GitHub remote..."
    git remote add origin "$GITHUB_URL" 2>/dev/null || git remote set-url origin "$GITHUB_URL"
    echo "Pushing to GitHub..."
    git branch -M main
    git push -u origin main
    echo -e "${GREEN}✓ Code pushed to GitHub${NC}"
else
    echo -e "${YELLOW}⚠ Skipping GitHub push. You can do this manually later.${NC}"
fi
echo ""

# Step 3: Render deployment info
echo -e "${BLUE}Step 3: Render.com Backend Deployment${NC}"
echo "=================================================="
echo ""
echo "1. Go to: https://render.com"
echo "2. Sign up/Login with GitHub"
echo "3. Click 'New +' → 'Web Service'"
echo "4. Select your repository"
echo "5. Configure:"
echo "   - Name: marketing-agent-backend"
echo "   - Region: Oregon (US West)"
echo "   - Root Directory: backend"
echo "   - Runtime: Docker"
echo "   - Instance Type: Free"
echo ""
echo "6. Add Environment Variables:"
echo "   PORT=8000"
echo "   ENVIRONMENT=production"
echo "   USE_MOCK_DATA=true"
echo ""
echo "7. Click 'Create Web Service'"
echo ""
read -p "Press Enter when backend is deployed, then paste your Render URL: " RENDER_URL
echo -e "${GREEN}✓ Backend URL saved: $RENDER_URL${NC}"
echo ""

# Step 4: Vercel deployment info
echo -e "${BLUE}Step 4: Vercel Frontend Deployment${NC}"
echo "=================================================="
echo ""
echo "1. Go to: https://vercel.com"
echo "2. Sign up/Login with GitHub"
echo "3. Click 'Add New...' → 'Project'"
echo "4. Select your repository"
echo "5. Configure:"
echo "   - Framework: Next.js (auto-detected)"
echo "   - Root Directory: frontend"
echo "   - Build Command: npm run build"
echo ""
echo "6. Add Environment Variable:"
echo "   NEXT_PUBLIC_API_URL=$RENDER_URL"
echo ""
echo "7. Click 'Deploy'"
echo ""
read -p "Press Enter when frontend is deployed, then paste your Vercel URL: " VERCEL_URL
echo -e "${GREEN}✓ Frontend URL saved: $VERCEL_URL${NC}"
echo ""

# Step 5: Summary
echo -e "${GREEN}=================================================="
echo "🎉 Deployment Complete!"
echo "==================================================${NC}"
echo ""
echo "Your Marketing Agent Dashboard is now live!"
echo ""
echo -e "${BLUE}Backend URL:${NC}  $RENDER_URL"
echo -e "${BLUE}Frontend URL:${NC} $VERCEL_URL"
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo "1. Visit your frontend URL"
echo "2. Login with: demo@marketing.ai / demo123"
echo "3. Test the dashboard features"
echo ""
echo "For API integration, see: API_CREDENTIALS_SETUP.md"
echo ""
echo -e "${GREEN}Happy deploying! 🚀${NC}"
