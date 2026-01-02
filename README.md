# task5-23MH1A0520

# Multi-Tenant SaaS Platform – Project & Task Management System

## 📌 Project Description
This project is a production-ready **Multi-Tenant SaaS application** that allows multiple organizations (tenants) to independently manage users, projects, and tasks with complete data isolation, role-based access control, and subscription-based limits.

The platform is designed for **organizations, teams, and SaaS providers** who require secure multi-tenant architecture with scalable backend APIs and a modern frontend interface.

---

## 🚀 Key Features
- Multi-tenant architecture with strict tenant data isolation
- Tenant registration with unique subdomain support
- Role-Based Access Control (Super Admin, Tenant Admin, User)
- JWT-based authentication and authorization
- Subscription plans with enforced limits (Free, Pro, Enterprise)
- Project and task management per tenant
- Audit logging for critical system actions
- Fully dockerized setup with one-command deployment
- Automatic database migrations and seed data initialization
- Health check endpoint for system monitoring

---

## 🛠 Technology Stack

### Frontend
- React.js 18
- React Router DOM
- Axios
- HTML5, CSS3, JavaScript (ES6+)

### Backend
- Node.js 18
- Express.js
- JSON Web Tokens (JWT)
- bcrypt for password hashing

### Database
- PostgreSQL 15

### DevOps & Containerization
- Docker
- Docker Compose
- PostgreSQL official Docker image

---

## 🏗 Architecture Overview

### System Architecture
The application follows a **three-tier architecture**:

- **Frontend**: React application running on port 3000
- **Backend API**: Node.js + Express server running on port 5000
- **Database**: PostgreSQL database running on port 5432

All services communicate internally using Docker service names.

> Architecture Diagram:  
> `docs/images/system-architecture.png`

---

## ⚙ Installation & Setup

### Prerequisites
- Docker & Docker Compose installed
- Git installed

---

### 🚀 One-Command Setup (Recommended)

From the project root:

```bash
docker-compose up -d --build

This will automatically:

Start PostgreSQL

Run database migrations

Insert seed data

Start backend API

Start frontend application

Access URLs

Frontend: http://localhost:3000

Backend API: http://localhost:5000

Health Check: http://localhost:5000/api/health

Environment Variables

All environment variables are defined in .env and .env.example.

Backend Environment Variables
Variable	Description
DB_HOST	Database host (database in Docker)
DB_PORT	Database port (5432)
DB_NAME	Database name
DB_USER	Database user
DB_PASSWORD	Database password
JWT_SECRET	Secret key for JWT signing
JWT_EXPIRES_IN	JWT token expiry
FRONTEND_URL	Frontend URL for CORS
PORT	Backend server port
📚 API Documentation

Detailed API documentation is available here:

📄 docs/API.md

Includes:

All 19 API endpoints

Request/response examples

Authentication & authorization rules

🧪 Test Credentials (Seed Data)
Super Admin

Email: superadmin@system.com

Password: Admin@123

Demo Tenant Admin

Email: admin@demo.com

Password: Demo@123

Subdomain: demo

Health Check

The backend exposes a health check endpoint:

GET /api/health


Response:

{
  "status": "ok",
  "database": "connected"
}

Deployment Notes

Fully containerized using Docker

Supports automated evaluation using docker-compose up -d

Production-ready architecture with automatic initialization
