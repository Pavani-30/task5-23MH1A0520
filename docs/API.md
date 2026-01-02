API Documentation – Multi-Tenant SaaS Platform

API 1: Register Tenant
- **Method:** POST
- **Endpoint:** /api/auth/register-tenant
- **Auth:** Public

**Request Body**
```json
{
  "tenantName": "Demo Company",
  "subdomain": "demo",
  "adminEmail": "admin@demo.com",
  "adminPassword": "Demo@123",
  "adminFullName": "Demo Admin"
}

Response: {
    "message": "Tenant registered successfully"
}

API 2: Login (Demo Tenant)

POST http://localhost:5000/api/auth/login

{
  "email": "admin@demo.com",
  "password": "Demo@123",
  "tenantSubdomain": "demo"
}

Response: {
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "value",
      "fullName": "value",
      "role": "tenant_admin",
      "tenantId": "uuid"
    },
    "token": "jwt-token-string",
    "expiresIn": 86400
  }
}


API 3: Get Current User

GET http://localhost:5000/api/auth/me

Headers:

Authorization: Bearer <TOKEN>

Response: {
  "success": true,
  "data": {
    "id": "uuid",
    "email": "value",
    "fullName": "value",
    "role": "tenant_admin",
    "isActive": true,
    "tenant": {
      "id": "uuid",
      "name": "value",
      "subdomain": "value",
      "subscriptionPlan": "pro",
      "maxUsers": 10,
      "maxProjects": 20
    }
  }
}


API 4: Logout

POST http://localhost:5000/api/auth/logout

Headers:Authorization: Bearer <TOKEN>
Response: {
  "success": true,
  "message": "Logged out successfully"
}

API 5: Get Tenant Details

GET /api/tenants/<TENANT_ID>
Headers:Authorization: Bearer <TOKEN>
Response: {
  "success": true,
  "data": {
    "id": "uuid",
    "name": "value",
    "subdomain": "value",
    "status": "active",
    "subscriptionPlan": "pro",
    "maxUsers": 10,
    "maxProjects": 20,
    "createdAt": "timestamp",
    "stats": {
      "totalUsers": 5,
      "totalProjects": 3,
      "totalTasks": 15
    }
  }
}

API 6: Update Tenant (Tenant Admin)

PUT /api/tenants/<TENANT_ID>

{
  "name": "Updated Company Name"
}
Response: {
  "success": true,
  "message": "Tenant updated successfully",
  "data": {
    "id": "uuid",
    "name": "updated-value",
    "updatedAt": "timestamp"
  }
}

API 7: List All Tenants (Super Admin)

Login as superadmin@system.com, then:
GET /api/tenants
Response: {
  "success": true,
  "data": {
    "tenants": [
      {
        "id": "uuid",
        "name": "value",
        "subdomain": "value",
        "status": "active",
        "subscriptionPlan": "pro",
        "totalUsers": 5,
        "totalProjects": 3,
        "createdAt": "timestamp"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalTenants": 47,
      "limit": 10
    }
  }
}

API 8: Add User

POST/api/tenants/<TENANT_ID>/users
{
  "email": "newuser@demo.com",
  "password": "NewUser@123",
  "fullName": "New User",
  "role": "user"
}
Response: {
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": "uuid",
    "email": "value",
    "fullName": "value",
    "role": "user",
    "tenantId": "uuid",
    "isActive": true,
    "createdAt": "timestamp"
  }
}

API 9: List Users
GET /api/tenants/<TENANT_ID>/users
Response: {
  "success": true,
  "data": {
    "users": [
      {
        "id": "uuid",
        "email": "value",
        "fullName": "value",
        "role": "tenant_admin",
        "isActive": true,
        "createdAt": "timestamp"
      }
    ],
    "total": 5,
    "pagination": {
      "currentPage": 1,
      "totalPages": 1,
      "limit": 50
    }
  }
}

API 10: Update User

PUT /api/users/<USER_ID>
{
  "fullName": "Updated Name"
}
Response: {
  "success": true,
  "message": "User updated successfully",
  "data": {
    "id": "uuid",
    "fullName": "updated-value",
    "role": "user",
    "updatedAt": "timestamp"
  }
}

API 11: Delete User

DELETE /api/users/<USER_ID>
Response: {
  "success": true,
  "message": "User deleted successfully"
}

API 12: Create Project

POST /api/projects
{
  "name": "Website Redesign Project",
  "description": "Complete redesign"
}
Response: {
  "success": true,
  "data": {
    "id": "uuid",
    "tenantId": "uuid",
    "name": "value",
    "description": "value",
    "status": "active",
    "createdBy": "uuid",
    "createdAt": "timestamp"
  }
}

API 13: List Projects

GET /api/projects
Response: {
  "success": true,
  "data": {
    "projects": [
      {
        "id": "uuid",
        "name": "value",
        "description": "value",
        "status": "active",
        "createdBy": {
          "id": "uuid",
          "fullName": "value"
        },
        "taskCount": 5,
        "completedTaskCount": 2,
        "createdAt": "timestamp"
      }
    ],
    "total": 3,
    "pagination": {
      "currentPage": 1,
      "totalPages": 1,
      "limit": 20
    }
  }
}

API 14: Update Project

PUT /api/projects/<PROJECT_ID>
{
  "status": "archived"
}
Response: {
  "success": true,
  "message": "Project updated successfully",
  "data": {
    "id": "uuid",
    "name": "updated-value",
    "description": "updated-value",
    "status": "active",
    "updatedAt": "timestamp"
  }
}

API 15: Delete Project

DELETE /api/projects/<PROJECT_ID>
Response: {
  "success": true,
  "message": "Project deleted successfully"
}

API 16: Create Task

POST /api/projects/<PROJECT_ID>/tasks
{
  "title": "Design homepage mockup",
  "priority": "high"
}
Response: {
  "success": true,
  "data": {
    "id": "uuid",
    "projectId": "uuid",
    "tenantId": "uuid",
    "title": "value",
    "description": "value",
    "status": "todo",
    "priority": "high",
    "assignedTo": "uuid",
    "dueDate": "2024-07-01",
    "createdAt": "timestamp"
  }
}

API 17: List Tasks

GET /api/projects/<PROJECT_ID>/tasks
Response: {
  "success": true,
  "data": {
    "tasks": [
      {
        "id": "uuid",
        "title": "value",
        "description": "value",
        "status": "in_progress",
        "priority": "high",
        "assignedTo": {
          "id": "uuid",
          "fullName": "value",
          "email": "value"
        },
        "dueDate": "2024-07-01",
        "createdAt": "timestamp"
      }
    ],
    "total": 5,
    "pagination": {
      "currentPage": 1,
      "totalPages": 1,
      "limit": 50
    }
  }
}

API 18: Update Task Status

PATCH /api/tasks/<TASK_ID>/status
{
  "status": "completed"
}
Response: {
  "success": true,
  "data": {
    "id": "uuid",
    "status": "completed",
    "updatedAt": "timestamp"
  }
}

API 19: Update Task

PUT /api/tasks/<TASK_ID>
{
  "priority": "high",
  "dueDate": "2024-08-01"
}
Response: {
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "id": "uuid",
    "title": "updated-value",
    "description": "updated-value",
    "status": "in_progress",
    "priority": "high",
    "assignedTo": {
      "id": "uuid",
      "fullName": "value",
      "email": "value"
    },
    "dueDate": "2024-07-20",
    "updatedAt": "timestamp"
  }
}
