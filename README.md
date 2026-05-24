# Inventory Reservation System

## Live URL

https://inventory-reservation-system-liard.vercel.app

---

## GitHub Repository

https://github.com/nithi-05K/inventory-reservation-system

---

# Tech Stack

- Next.js
- TypeScript
- Prisma
- PostgreSQL (Supabase)
- Vercel

---

# Features

- Create inventory reservations
- Confirm reservations
- PostgreSQL database integration
- Prisma ORM support
- Live deployment using Vercel

---

# Run Locally

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

## Environment Variables

Create a `.env` file:

```env
DATABASE_URL=your_database_url
DIRECT_URL=your_direct_database_url
```

---

## Prisma Generate

```bash
npx prisma generate
```

---

## Run Development Server

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

# Expiry Mechanism

Reservations are initially created with a `PENDING` status and an expiry timestamp.
The reservation can later be confirmed using the confirm endpoint.

Expired reservations can be cleaned up and inventory restored using background jobs or scheduled cleanup logic.

---

# Tradeoffs

- Focused mainly on backend API functionality.
- Frontend UI was intentionally kept minimal.
- Redis/background worker support was not implemented due to time constraints.
- Priority was given to deployment stability and API correctness.

---

# Deployment

- Frontend hosted on Vercel
- PostgreSQL hosted on Supabase

---

# Author

Nithitha K