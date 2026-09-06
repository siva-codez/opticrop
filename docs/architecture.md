# OptiCrop Architecture

## System Overview

```
┌─────────────┐     ┌─────────────┐     ┌──────────────┐
│  React Web  │     │ React Native│     │   Admin UI   │
│  (Vite)     │     │  (Expo)     │     │   (React)    │
└──────┬──────┘     └──────┬──────┘     └──────┬───────┘
       │                   │                    │
       └───────────┬───────┴────────────────────┘
                   │  HTTPS / REST API
           ┌───────▼────────┐
           │    FastAPI      │
           │   Backend       │
           ├────────────────┤
           │  Service Layer  │
           ├────┬───┬───┬───┤
           │Auth│ML │AI │Wx │
           └──┬─┴─┬─┴─┬─┴─┬─┘
              │   │   │   │
         ┌────▼┐ ┌▼──┐│  ┌▼──────────┐
         │ DB  │ │ML ││  │OpenWeather │
         │ PG  │ │Mod││  │    API     │
         └─────┘ └───┘│  └────────────┘
                   ┌───▼──┐
                   │OpenAI│
                   │ API  │
                   └──────┘
```

## Technology Stack

### Frontend (Web)
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS 4 (zero-config with @tailwindcss/vite)
- **Routing**: React Router 8 (createBrowserRouter)
- **Data Fetching**: TanStack Query 5
- **HTTP Client**: Axios with JWT interceptors
- **Charts**: Recharts 3
- **Icons**: Lucide React

### Backend
- **Framework**: FastAPI 0.141+
- **Language**: Python 3.12
- **ORM**: SQLAlchemy 2.0 (async with asyncpg)
- **Migrations**: Alembic 1.19 (async template)
- **Validation**: Pydantic 2.13
- **Auth**: JWT (python-jose) + bcrypt (passlib)
- **Database**: PostgreSQL 16

### Mobile
- **Framework**: React Native with Expo SDK 57
- **Routing**: Expo Router (file-based)
- **Language**: TypeScript

### AI/ML
- **Assistant**: OpenAI API (gpt-4o-mini, configurable)
- **Crop Model**: scikit-learn + joblib
- **Disease Model**: Vision Transformer (wambugu71/crop_leaf_diseases_vit via Hugging Face & PyTorch)
- **Weather**: OpenWeatherMap API

## Design Patterns

### Backend Architecture
- **Service Layer Pattern**: Business logic isolated in services
- **Repository Pattern**: Database operations abstracted
- **Dependency Injection**: FastAPI `Depends()` with `Annotated`
- **Model Registry**: ML model loading centralized
- **Mock Mode**: `MOCK_ML=true` for development without trained models

### Frontend Architecture
- **Component-Based**: Small, reusable UI components
- **Custom Hooks**: Encapsulated data fetching and state
- **Centralized API Client**: Single Axios instance with interceptors
- **Type-Safe**: Strict TypeScript throughout
- **Protected Routes**: JWT-gated navigation

### Security
- JWT authentication (access + refresh tokens)
- Password hashing with bcrypt
- CORS configuration
- Input validation via Pydantic
- File upload validation (type, size, MIME)
- API keys server-side only
- Role-based access control (user/admin)
