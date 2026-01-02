System Architecture Overview

Flow:
Client → Frontend → Backend API → PostgreSQL
JWT is used for authentication between frontend and backend.

Database Schema (ERD)

Tables:

tenants

users

projects

tasks

audit_logs

Each table includes tenant_id except super admin users.

API Architecture
Module	Method	Endpoint	Auth	Role
Auth	POST	/api/auth/login	❌	All
Auth	POST	/api/auth/register	❌	Tenant
Tenant	GET	/api/tenants	✅	Super Admin
Users	POST	/api/users	✅	Tenant Admin
Projects	POST	/api/projects	✅	Admin
Tasks	POST	/api/tasks	✅	User

(15+ endpoints total)
