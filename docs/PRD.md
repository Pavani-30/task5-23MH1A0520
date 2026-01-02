User Personas
1. Super Admin

Role: System-level administrator

Responsibilities: Manage tenants, monitor system

Goals: Platform stability, security

Pain Points: Tenant misuse, scaling issues

2. Tenant Admin

Role: Organization administrator

Responsibilities: Manage users, projects, tasks

Goals: Team productivity

Pain Points: User limits, access control

3. End User

Role: Regular team member

Responsibilities: Work on tasks

Goals: Task completion

Pain Points: Limited permissions

Functional Requirements
Authentication

FR-001: The system shall allow user login using email and password.

FR-002: The system shall generate JWT tokens with 24-hour expiry.

Tenant

FR-003: The system shall allow tenant registration with unique subdomain.

FR-004: The system shall isolate tenant data completely.

Users

FR-005: The system shall allow tenant admins to create users.

FR-006: The system shall enforce role-based access control.

Projects

FR-007: The system shall allow project creation per tenant.

FR-008: The system shall enforce project limits per subscription.

Tasks

FR-009: The system shall allow task creation under projects.

FR-010: The system shall allow task status updates.

Subscription

FR-011: The system shall assign free plan by default.

FR-012: The system shall prevent resource creation beyond limits.

Audit

FR-013: The system shall log critical actions.

FR-014: The system shall record user actions.

FR-015: The system shall store timestamps for logs.

Non-Functional Requirements

NFR-001: API response time < 200ms for 90% requests

NFR-002: Passwords must be hashed

NFR-003: System supports 100 concurrent users

NFR-004: 99% uptime target

NFR-005: Mobile-responsive UI
