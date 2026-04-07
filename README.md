# FinTrack

Finance data processing platform with role-based access control, analytics APIs, and a modern React dashboard.

[![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-API-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-Frontend-61DAFB?logo=react&logoColor=111827)](https://react.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Redis](https://img.shields.io/badge/Redis-Session%20Store-DC382D?logo=redis&logoColor=white)](https://redis.io/)
[![Sequelize](https://img.shields.io/badge/Sequelize-ORM-52B0E7?logo=sequelize&logoColor=white)](https://sequelize.org/)
[![Vite](https://img.shields.io/badge/Vite-Frontend%20Build-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![License](https://img.shields.io/badge/License-MIT-22C55E)](LICENSE)

## Quick Links

[![Postman Docs](https://img.shields.io/badge/Postman-API%20Docs-FF6C37?logo=postman&logoColor=white)](https://documenter.getpostman.com/view/39331953/2sBXiqEUQ9)
[![Live Backend](https://img.shields.io/badge/Render-Live%20Backend-46E3B7?logo=render&logoColor=111827)](https://fintrack-d70e.onrender.com)

## DB Schema
<img width="1112" height="1005" alt="Untitled" src="https://github.com/user-attachments/assets/93cbaac6-60dd-4d61-8848-1929f176cddd" />

## Folder Structure
```
└── 📁backend
    └── 📁env
        ├── .env.development
        ├── .env.production
    └── 📁src
        └── 📁api
            └── 📁v1
                ├── auth-routes.js
                ├── category-routes.js
                ├── dashboard-routes.js
                ├── financial-record-routes.js
                ├── index.js
                ├── user-routes.js
            ├── index.js
        └── 📁config
            ├── db-config.js
            ├── index.js
            ├── passport-config.js
            ├── redis-config.js
            ├── server-config.js
            ├── session-config.js
        └── 📁controllers
            ├── auth.controller.js
            ├── category.controller.js
            ├── dashboard.controller.js
            ├── financial-record.controller.js
            ├── index.js
            ├── user.controller.js
        └── 📁middlewares
            ├── async-handler.middleware.js
            ├── auth.middleware.js
            ├── index.js
            ├── role.middleware.js
        └── 📁migrations
            ├── 20260403082311-create-role.js
            ├── 20260403082659-create-user.js
            ├── 20260403082824-create-category.js
            ├── 20260403083212-create-financial-record.js
        └── 📁models
            ├── category.js
            ├── financialrecord.js
            ├── index.js
            ├── role.js
            ├── user.js
        └── 📁queries
            ├── dashboard.query.js
            ├── financial-record.query.js
            ├── index.js
        └── 📁repository
            ├── auth.repository.js
            ├── category.repository.js
            ├── crud.repository.js
            ├── dashboard.repository.js
            ├── financial-record.repository.js
            ├── index.js
            ├── user.repository.js
        └── 📁seeders
            ├── 20260404090000-seed-roles.js
            ├── 20260404090100-seed-users.js
            ├── 20260404090200-seed-categories.js
            ├── 20260404090300-seed-financial-records.js
        └── 📁services
            ├── auth.service.js
            ├── category.service.js
            ├── dashboard.service.js
            ├── financial-record.service.js
            ├── index.js
            ├── user.service.js
        └── 📁utils
            ├── index.js
            ├── sendError.js
            ├── sendResponse.js
            ├── userToPublic.js
        └── 📁validators
            ├── auth.validator.js
            ├── category.validator.js
            ├── financial-record.validator.js
            ├── index.js
            ├── user.validator.js
        ├── server.js
    ├── .gitignore
    ├── .sequelizerc
    ├── package-lock.json
    └── package.json
```

## Objective

This project implements a backend for a finance dashboard system and is structured to demonstrate:

- API design and versioned routing
- Modular architecture in api, controllers, services and repository
- Data modeling for users, roles, categories, and financial records
- Business logic for CRUD and dashboard aggregations
- Backend access control using authentication and role-based authorization via passport.js and redis making blazing fast
- Validation and standardized error handling using middlewares
- Persistence with PostgreSQL - Neon and Sequelize ORM

The implementation focuses on correctness, clarity, and maintainability with a layered architecture.

### 1) User and Role Management

- User registration, login, logout, and profile retrieval are implemented.
- Role model exists with seeded roles: viewer, analyst, admin.
- Role assignment/update is supported for admins.
- User status and role status are validated during authentication/profile access.

Public authentication routes:

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`

Authenticated account routes:

- `GET /api/v1/auth/profile`
- `POST /api/v1/auth/logout`

### 2) Financial Records Management

- Create, read, update, and soft-delete operations are implemented.
- Supported record fields: amount, type (income/expense), category, date, notes, status.
- Filtering is supported by category, type, status, date/date range, amount/min-max, and pagination.

Access level in the current implementation:

- Analyst and admin can view financial records.
- Admin can create, update, and soft-delete financial records.

### 3) Dashboard Summary APIs

- Summary endpoint for total income, total expense, and net balance.
- Category breakdown endpoint for category-wise totals and transaction count.
- Trends endpoint for month-wise income/expense.
- Recent transactions endpoint.
- Category details endpoint with category-level aggregates.

Access level in the current implementation:

- Any authenticated user can access summary, breakdown, trends, and recent transactions.
- Analyst and admin can access category details.

### 4) Access Control Logic

- Session-based authentication with Passport + Redis-backed sessions.
- Authorization middleware restricts role-sensitive endpoints.
- Current behavior:
  - Public: register and login.
  - Authenticated users: profile, logout, and dashboard read endpoints (summary, breakdown, trends, recent transactions).
  - Analyst and admin: category reads, financial record reads, and dashboard category details.
  - Admin: user management, category mutations, and financial record create/update/soft-delete.

### 5) Validation and Error Handling

- Request validation exists for auth, category, financial record, and user-role update flows.
- Consistent response shape and error codes are returned via utility helpers.
- Correct HTTP status usage (400/401/403/404/409/500) is applied across services/controllers.

### 6) Data Persistence

- PostgreSQL - Neon is used with Sequelize migrations, models, and seeders.
- Soft-delete style flags are present in entities (`is_deleted`) and are used in record/category logic.

### Optional Enhancements Included

- Session-based authentication
- Pagination for list endpoints
- Search/filter support
- Soft-delete for financial records

## Tech Stack

- Backend runtime: Node.js
- Backend framework: Express
- ORM and migrations: Sequelize, sequelize-cli
- Database: PostgreSQL, Neon
- Authentication: express-session, Passport, passport-local
- Session store: Redis using connect-redis and an Upstash-compatible Redis URL
- Password hashing: bcrypt
- Request handling: cors, morgan, http-status-codes, dotenv
- Frontend stack: React 19, Vite, React Router, Tailwind CSS 4
- UI and utility libraries: shadcn/ui, Radix UI, Lucide React, Sonner, Recharts, TanStack Table, dnd-kit
- Deployment target: Heroku for backend, Vercel for frontend

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

- `POST /api/v1/auth/register` (public)
- `POST /api/v1/auth/login` (public)
- `POST /api/v1/auth/logout` (authenticated)
- `GET /api/v1/auth/profile` (authenticated)

### Users

- `GET /api/v1/users` (admin)
- `PATCH /api/v1/users/:id/role` (admin)

### Categories

- `GET /api/v1/categories` (analyst, admin)
- `GET /api/v1/categories/:id` (analyst, admin)
- `POST /api/v1/categories` (admin)
- `PATCH /api/v1/categories/:id` (admin)
- `DELETE /api/v1/categories/:id` (admin)

### Financial Records

- `GET /api/v1/financial-records` (analyst, admin)
- `GET /api/v1/financial-records/:id` (analyst, admin)
- `POST /api/v1/financial-records` (admin)
- `PATCH /api/v1/financial-records/:id` (admin)
- `PATCH /api/v1/financial-records/:id/soft-delete` (admin)

### Dashboard

- `GET /api/v1/dashboard/summary` (authenticated)
- `GET /api/v1/dashboard/categories/breakdown` (authenticated)
- `GET /api/v1/dashboard/trends` (authenticated)
- `GET /api/v1/dashboard/recent-transactions` (authenticated)
- `GET /api/v1/dashboard/categories/:categoryId/details` (analyst, admin)

## Environment Setup

Environment files are loaded from `backend/env/.env.<NODE_ENV>`.

### How Environment Loading Works

- The app attempts to load `backend/env/.env.<NODE_ENV>` via dotenv.
- After that, all configuration is read from `process.env`.
- On cloud platforms (Heroku/Vercel), platform environment variables are injected into `process.env` and work even if the local env file does not exist.
- Recommended practice: use env files for local development only, and platform-managed env vars for production.

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

Important:

- Do not commit real production secrets to git.
- If any secret was exposed earlier, rotate it before deployment.

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
