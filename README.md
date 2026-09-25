# Vetri Driving Academy — Full-Stack Demo

A production-ready driving school website built as a demo for local driving school businesses in Tamil Nadu.

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, React Router v6, TanStack Query
- **Backend**: Python 3.13+, FastAPI, SQLAlchemy 2.0, Pydantic, asyncpg
- **Database**: SQLite (local) / PostgreSQL (production)

## Quick Start

### 1. Set Up the Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux
pip install -r requirements.txt
```

Copy `.env.example` to `.env` (already done for local dev).

### 2. Seed the Database

```bash
cd backend
python -m seed
```

### 3. Start the Backend Server

```bash
cd backend
uvicorn app.main:app --reload --port 8000
```

API docs available at: http://localhost:8000/docs

### 4. Start the Frontend Dev Server

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Project Structure

```
vetri-driving-academy/
├── frontend/          # React + Vite app
│   ├── src/
│   │   ├── components/  # UI, layout, sections, motion
│   │   ├── pages/       # Route pages
│   │   ├── hooks/       # Custom React hooks
│   │   ├── lib/         # API client, constants
│   │   └── types/       # TypeScript interfaces
│   └── ...
└── backend/           # FastAPI app
    ├── app/
    │   ├── api/         # Route handlers
    │   ├── core/        # Config, database
    │   ├── models/      # SQLAlchemy models
    │   └── schemas/     # Pydantic schemas
    └── seed.py        # Demo data seeder
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/courses` | List active courses |
| GET | `/api/courses/{id}` | Single course |
| GET | `/api/reviews` | List reviews |
| POST | `/api/enquiries` | Submit enquiry |

## Business Data (Demo)

- **Business**: Vetri Driving Academy, Madurai
- **Courses**: 6 (LMV, Two-Wheeler, Commercial, HMV, Automatic, Refresher)
- **Reviews**: 10 realistic testimonials
- **Instructors**: 8 certified professionals
- **Fleet**: 13 vehicles
