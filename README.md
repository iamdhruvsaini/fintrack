# FinTrack - Finance Data Processing and Access Control Backend

## Objective
This project implements a backend for a finance dashboard system and is structured to demonstrate:

- API design and versioned routing
- Data modeling for users, roles, categories, and financial records
- Business logic for CRUD and dashboard aggregations
- Backend access control using authentication and role-based authorization
- Validation and standardized error handling
- Persistence with PostgreSQL and Sequelize ORM

The implementation focuses on correctness, clarity, and maintainability with a layered architecture.

## Assignment Coverage

### 1) User and Role Management
- User registration, login, logout, and profile retrieval are implemented.
- Role model exists with seeded roles: viewer, analyst, admin.
- Role assignment/update is supported for admins.
- User status and role status are validated during authentication/profile access.

### 2) Financial Records Management
- Create, read, update, and soft-delete operations are implemented.
- Supported record fields: amount, type (income/expense), category, date, notes, status.
- Filtering is supported by category, type, status, date/date range, amount/min-max, and pagination.

### 3) Dashboard Summary APIs
- Summary endpoint for total income, total expense, and net balance.
- Category breakdown endpoint for category-wise totals and transaction count.
- Trends endpoint for month-wise income/expense.
- Recent transactions endpoint.
- Category details endpoint with category-level aggregates.

### 4) Access Control Logic
- Session-based authentication with Passport + Redis-backed sessions.
- Authorization middleware restricts role-sensitive endpoints.
- Current behavior:
	- Admin: full management endpoints (users role updates, category mutations, record mutations/listing).
	- Authenticated users (viewer/analyst/admin): dashboard read endpoints, category reads, own profile, record-by-id access.

### 5) Validation and Error Handling
- Request validation exists for auth, category, financial record, and user-role update flows.
- Consistent response shape and error codes are returned via utility helpers.
- Correct HTTP status usage (400/401/403/404/409/500) is applied across services/controllers.

### 6) Data Persistence
- PostgreSQL is used with Sequelize migrations, models, and seeders.
- Soft-delete style flags are present in entities (`is_deleted`) and are used in record/category logic.

### Optional Enhancements Included
- Session-based authentication
- Pagination for list endpoints
- Search/filter support
- Soft-delete for financial records

## Tech Stack
- Runtime: Node.js
- Framework: Express
- ORM: Sequelize + sequelize-cli
- Database: PostgreSQL
- Session/Auth: express-session, Passport, Redis store
- Cache/Session store: Redis (Upstash-compatible URL)
- Frontend (separate app in workspace): React + Vite

## Project Structure
Key backend folders:

- `backend/src/api` - route registration and API versioning
- `backend/src/controllers` - request/response orchestration
- `backend/src/services` - business logic
- `backend/src/repository` - data access layer
- `backend/src/models` - Sequelize models and associations
- `backend/src/migrations` - schema migrations
- `backend/src/seeders` - seed data (roles, users, categories, records)
- `backend/src/middlewares` - auth, authorization, async handling
- `backend/src/validators` - input/query validation
- `backend/src/config` - DB, Redis, session, server config

## API Base URL
- Root health/welcome: `GET /`
- Versioned API base: `/api/v1`

## Main API Endpoints

### Auth
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/logout` (authenticated)
- `GET /api/v1/auth/profile` (authenticated)

### Users
- `GET /api/v1/users` (admin)
- `PATCH /api/v1/users/:id/role` (admin)

### Categories
- `GET /api/v1/categories` (authenticated)
- `GET /api/v1/categories/:id` (authenticated)
- `POST /api/v1/categories` (admin)
- `PATCH /api/v1/categories/:id` (admin)
- `DELETE /api/v1/categories/:id` (admin)

### Financial Records
- `GET /api/v1/financial-records` (admin)
- `GET /api/v1/financial-records/:id` (authenticated)
- `POST /api/v1/financial-records` (admin)
- `PATCH /api/v1/financial-records/:id` (admin)
- `PATCH /api/v1/financial-records/:id/soft-delete` (admin)

### Dashboard
- `GET /api/v1/dashboard/summary` (authenticated)
- `GET /api/v1/dashboard/categories/breakdown` (authenticated)
- `GET /api/v1/dashboard/trends` (authenticated)
- `GET /api/v1/dashboard/recent-transactions` (authenticated)
- `GET /api/v1/dashboard/categories/:categoryId/details` (authenticated)

## Environment Setup
Environment files are loaded from `backend/env/.env.<NODE_ENV>`.

### Required Variables (Development)
Create `backend/env/.env.development` with:

```env
NODE_ENV=development

DB_DIALECT=postgres
DB_USER=postgres
DB_PASS=your_postgres_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=fintrack

PORT=3000
UPSTASH_REDIS_URL=rediss://<username>:<password>@<host>:6379
SESSION_SECRET=replace_with_a_long_random_secret
CORS_ORIGIN=http://localhost:5173
SESSION_MAX_AGE=86400000
```

### Production Variables
Create `backend/env/.env.production` with production-safe values:

```env
NODE_ENV=production

DATABASE_URL=postgres://<user>:<password>@<host>:<port>/<database>
DB_DIALECT=postgres

PORT=3000
UPSTASH_REDIS_URL=rediss://<username>:<password>@<host>:6379
SESSION_SECRET=replace_with_a_long_random_secret
CORS_ORIGIN=https://your-frontend-domain.com
SESSION_MAX_AGE=86400000
```

## Setup and Start Commands

### 1) Install Dependencies
From project root:

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 2) Create Environment Files (PowerShell)
From project root:

```powershell
New-Item -ItemType Directory -Path .\backend\env -Force | Out-Null
Set-Content .\backend\env\.env.development @"
NODE_ENV=development
DB_DIALECT=postgres
DB_USER=postgres
DB_PASS=your_postgres_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=fintrack
PORT=3000
UPSTASH_REDIS_URL=rediss://<username>:<password>@<host>:6379
SESSION_SECRET=replace_with_a_long_random_secret
CORS_ORIGIN=http://localhost:5173
SESSION_MAX_AGE=86400000
"@
```

Optional production file:

```powershell
Set-Content .\backend\env\.env.production @"
NODE_ENV=production
DATABASE_URL=postgres://<user>:<password>@<host>:<port>/<database>
DB_DIALECT=postgres
PORT=3000
UPSTASH_REDIS_URL=rediss://<username>:<password>@<host>:6379
SESSION_SECRET=replace_with_a_long_random_secret
CORS_ORIGIN=https://your-frontend-domain.com
SESSION_MAX_AGE=86400000
"@
```

### 3) Database Migration and Seed
From `backend` directory:

```bash
npx cross-env NODE_ENV=development sequelize-cli db:migrate
npx cross-env NODE_ENV=development sequelize-cli db:seed:all
```

Production scripts available:

```bash
npm run db:migrate:prod
npm run db:seed:prod
```

### 4) Start Backend
From `backend` directory:

```bash
npm run dev
```

Other modes:

```bash
npm run start
npm run prod
```

### 5) Start Frontend (Optional)
From `frontend` directory:

```bash
npm run dev
```

## Access Control Summary
- Viewer: authenticated read access to dashboard, profile, categories (read), and record-by-id route.
- Analyst: same authenticated read access pattern as current viewer behavior.
- Admin: full management for users, categories, and financial records.

## Validation and Reliability Notes
- Validators enforce payload type checks, required fields, enum constraints, and query shape checks.
- Financial record filters validate numeric/date inputs and range correctness.
- Service layer handles not-found, inactive-state, duplicate, and constraint scenarios with explicit error codes.

## Assumptions and Tradeoffs
- Session-based auth is used instead of JWT (good for server-managed sessions).
- Redis is required for session persistence.
- Role matrix is conservative for write operations (admin-only writes).
- Financial record creation currently uses server-time as record date in service layer.

## What This Demonstrates for Evaluation
- Clear separation of concerns (routes -> controllers -> services -> repository).
- Practical access control with reusable middleware.
- Maintainable validation and error-handling strategy.
- Aggregation endpoints beyond simple CRUD for dashboard use-cases.
- Real persistence workflow with migrations and seed data.
