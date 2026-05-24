# Inventory Reservation System

## Live URL

https://inventory-reservation-system-liard.vercel.app/

---

## GitHub Repository

https://github.com/nithi-05K/inventory-reservation-system

---

# Project Overview

This project is a backend-focused inventory reservation system built using Next.js, Prisma, PostgreSQL, and Vercel.

The system allows users to:

- Create inventory reservations
- Confirm reservations
- Track reservation status
- Manage inventory using PostgreSQL

The project demonstrates API design, database integration, deployment, and reservation workflow handling.

---

# Tech Stack

- Next.js 16
- TypeScript
- Prisma ORM
- PostgreSQL (Supabase)
- Vercel Deployment

---

# Features

- Reservation creation API
- Reservation confirmation API
- PostgreSQL database integration
- Prisma ORM support
- Live deployment using Vercel
- Hosted database using Supabase

---

# Local Setup

## Clone Repository

```bash
git clone https://github.com/nithi-05K/inventory-reservation-system.git
```

---

## Install Dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the root folder.

```env
DATABASE_URL=your_database_url
DIRECT_URL=your_direct_database_url
```

---

# Prisma Setup

## Generate Prisma Client

```bash
npx prisma generate
```

## Push Database Schema

```bash
npx prisma db push
```

---

# Run Development Server

```bash
npm run dev
```

---

# API Endpoints

## Create Reservation

### Endpoint

```bash
POST /api/reservations
```

### Example Request Body

```json
{
  "productId": "cmpjk3ulg00006vvxmtlxfbhg",
  "warehouseId": "cmpjk3uut00026vvx0juq0lvg",
  "quantity": 2
}
```

---

## Confirm Reservation

### Endpoint

```bash
POST /api/reservations/:id/confirm
```

---

# Reservation Flow

1. Create a reservation using the reservations API.
2. Reservation is stored with `PENDING` status.
3. Confirm reservation using the confirm endpoint.
4. Reservation status becomes `CONFIRMED`.

---

# Expiry Mechanism

Reservations are created with a pending state and expiry timestamp.

Expired reservations can later be cleaned up and inventory restored using scheduled cleanup logic or background jobs.

For this implementation, the focus was mainly on API functionality and deployment stability.

---

# Tradeoffs

- Focused mainly on backend API functionality.
- Frontend UI was intentionally kept minimal.
- Redis and distributed locking were not implemented due to time constraints.
- Background workers and automated expiry cleanup were not added.
- Priority was given to deployment stability, Prisma integration, and API correctness.

---

# Deployment

- Frontend/API deployed on Vercel
- PostgreSQL hosted on Supabase

---

# Author

Nithitha K