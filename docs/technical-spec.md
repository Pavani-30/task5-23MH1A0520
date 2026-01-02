Project Structure
Backend

backend/
 ├── src/
 │   ├── controllers/   # Business logic
 │   ├── models/        # DB queries
 │   ├── routes/        # API routes
 │   ├── middleware/    # Auth & RBAC
 │   ├── utils/         # Helpers
 │   └── config/        # DB config
 ├── migrations/        # DB migrations
 └── tests/             # Unit tests

Frontend

frontend/
 ├── src/
 │   ├── pages/         # UI pages
 │   ├── components/    # Reusable UI
 │   ├── services/      # API calls
 │   ├── routes/        # Protected routes
 │   └── utils/         # Helpers


Development Setup Guide
Prerequisites

Node.js ≥ 18

Docker & Docker Compose

PostgreSQL (via Docker)

Environment Variables

DB_HOST=database
DB_PORT=5432
DB_NAME=saas_db
DB_USER=postgres
DB_PASSWORD=postgres
JWT_SECRET=dev_secret

Installation Steps (WHERE & HOW)

Open terminal in project root

Run:

docker-compose up -d


Backend → http://localhost:5000

Frontend → http://localhost:3000

Running Tests
cd backend
npm test
