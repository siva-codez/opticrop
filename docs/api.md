# OptiCrop API Documentation

## Base URL

- **Development**: `http://localhost:8000`
- **Production**: `https://api.opticrop.com`

## Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <access_token>
```

## Endpoints

### Health

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/health` | ❌ | Health check |

### Authentication

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | ❌ | Register new user |
| POST | `/api/auth/login` | ❌ | Login |
| POST | `/api/auth/refresh` | 🔑 | Refresh access token |
| GET | `/api/auth/me` | 🔑 | Get current user |

### Crop Prediction

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/crop/predict` | 🔑 | Get crop recommendations |
| POST | `/api/crop/suitability` | 🔑 | Check crop suitability |
| GET | `/api/crop/history` | 🔑 | Get prediction history |

### Disease Detection

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/disease/predict` | 🔑 | Analyze leaf image |
| GET | `/api/disease/history` | 🔑 | Get diagnosis history |

### AI Assistant

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/assistant/chat` | 🔑 | Send message to assistant |
| GET | `/api/assistant/history` | 🔑 | Get chat history |
| DELETE | `/api/assistant/history` | 🔑 | Clear chat history |

### Weather

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/weather` | 🔑 | Get current weather |
| GET | `/api/weather/forecast` | 🔑 | Get weather forecast |

### Fertilizer

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/fertilizer/recommend` | 🔑 | Get fertilizer recommendations |

### Irrigation

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/irrigation/recommend` | 🔑 | Get irrigation recommendations |

### Reports

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/reports/generate` | 🔑 | Generate PDF report |
| GET | `/api/reports` | 🔑 | List reports |
| GET | `/api/reports/{id}` | 🔑 | Download report |

### User Profile

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/users/me` | 🔑 | Get profile |
| PUT | `/api/users/me` | 🔑 | Update profile |

### Admin

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/admin/analytics` | 👑 | Platform analytics |
| GET | `/api/admin/users` | 👑 | List all users |
| GET | `/api/admin/predictions` | 👑 | All predictions |

**Legend**: ❌ = No auth | 🔑 = User auth | 👑 = Admin auth

## Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message"
  }
}
```

## Interactive Docs

FastAPI provides automatic interactive API documentation:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`
