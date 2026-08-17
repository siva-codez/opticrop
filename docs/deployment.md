# OptiCrop Deployment Guide

## Overview

| Component | Platform | URL Pattern |
|-----------|----------|-------------|
| Web Frontend | Vercel | `https://opticrop.vercel.app` |
| Backend API | Render | `https://opticrop-api.onrender.com` |
| Database | Render PostgreSQL | Managed |
| Mobile App | Expo EAS | App Store / Google Play |

## Web Frontend → Vercel

### Setup

1. Push code to GitHub
2. Connect repo to Vercel
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Set environment variable:
   - `VITE_API_URL` = your Render backend URL

### Automatic Deployments

Vercel deploys automatically on push to `main`.

## Backend API → Render

### Setup

1. Create a new **Web Service** on Render
2. Connect GitHub repo
3. Configure:
   - **Root Directory**: `backend`
   - **Runtime**: Docker
   - **Instance Type**: Free (or Starter for production)
4. Set environment variables (see `backend/.env.example`)

### Database

1. Create a **PostgreSQL** instance on Render
2. Copy the **Internal Database URL** to `DATABASE_URL`
3. Run migrations: `alembic upgrade head`

## Mobile App → Expo EAS

### Prerequisites

```bash
npm install -g eas-cli
eas login
```

### Build

```bash
cd mobile

# Android
eas build --platform android

# iOS
eas build --platform ios

# Both
eas build --platform all
```

### Submit to Stores

```bash
# Google Play
eas submit --platform android

# App Store
eas submit --platform ios
```

## Environment Variables Checklist

Before deploying, ensure all these are set:

- [ ] `DATABASE_URL` — PostgreSQL connection string
- [ ] `JWT_SECRET_KEY` — Strong random secret (min 32 chars)
- [ ] `OPENAI_API_KEY` — OpenAI API key
- [ ] `WEATHER_API_KEY` — OpenWeatherMap API key
- [ ] `FRONTEND_URL` — Vercel frontend URL (for CORS)
- [ ] `ENVIRONMENT` — Set to `production`
- [ ] `MOCK_ML` — Set to `false` in production

## Security Checklist

- [ ] JWT secret is strong and unique
- [ ] API keys are not in frontend/mobile code
- [ ] CORS is configured for production frontend URL only
- [ ] HTTPS is enforced
- [ ] Database credentials are not in code
- [ ] File upload size limits are configured
- [ ] Rate limiting is enabled
