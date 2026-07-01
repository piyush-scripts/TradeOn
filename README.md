# TradeOn: High-Performance Opinion Trading Engine

TradeOn is a real-time, low-latency opinion trading platform engineered to process high-throughput trades synchronously and race-condition free. The platform balances high-performance in-memory trading with robust database persistence by decoupling ingestion, matching, and writing into dedicated worker processes.

---

## 🏗️ System Architecture

Rather than executing trades inside blocking REST handlers, TradeOn partitions concerns across three highly decoupled layers using **Redis** as a quick queue and messaging broker.

```
                  ┌────────────────────────────────────────┐
                  │          Next.js Web Client            │
                  └───────┬────────────────────────▲───────┘
                          │ HTTP                   │ WebSockets
         (Verify Auth)    ▼                        │ (Live Updates)
                  ┌───────────────┐        ┌───────┴────────┐
                  │  API Ingress  ├───────►│ Socket Gateway │
                  └───────┬───────┘        └───────▲────────┘
                          │                        │ PubSub
                          ▼ rpush                  │
                  ┌───────────────┐        ┌───────┴────────┐
                  │ queue:orders  │        │ market_updates │
                  └───────┬───────┘        └───────▲────────┘
                          │ blpop                  │
                       ┌──▼────────────────────────┴──┐
                       │    Synchronous Match Loop    ├──────┐
                       │   (In-Memory Balances/Books) │      │
                       └──────────────────────────────┘      │ rpush
                                                             ▼
                                                    ┌────────────────┐
                                                    │ queue:db_writes│
                                                    └────────┬───────┘
                                                             │ blpop
                                                    ┌────────▼───────┐
                                                    │  DB Sync Worker│
                                                    └────────┬───────┘
                                                             ▼
                                                    ┌────────────────┐
                                                    │   Postgres DB  │
                                                    └────────────────┘
```

### 1. Ingestion Layer (API Gateway)
* **Stack**: Express.js + Clerk Authentication
* **Role**: Validates order syntax (price, quantity, side) via Zod, checks Clerk JWT signatures in-mem, and generates a UUID.
* **Database footprints**: **0 DB queries**. The gateway enqueues the order payload to a Redis list (`queue:orders`) and responds `202 Accepted` to the client in `<2ms`.

### 2. Execution Layer (Match Engine Core)
* **Stack**: Dedicated Node.js Worker (`npm run engine`)
* **Role**: Processes the queue sequentially to guarantee zero race-conditions.
* **Internal Data Layout**:
  * **Balances**: A Javascript `Map` storing user balance allocations (in-memory collateral checks).
  * **Orderbooks**: Dynamic arrays of YES/NO limit orders indexed by market.
* **Logic**: Order matching is computed entirely on CPU memory space.
  * If a match occurs, executed trades are dispatched to `queue:db_writes` asynchronously.
  * Live updates are pushed to the Redis pub/sub channel (`pubsub:market_updates`).
  * Unmatched shares rest in the memory-only order book.
* **Database footprints**: **0 DB queries during execution**.

### 3. Asymmetric Persistence Layer (Database Sync)
* **Stack**: Dedicated Persistence Worker (`npm run persistence`)
* **Role**: Plucks executed trades and balance updates from `queue:db_writes` and posts them to **Postgres** (drained step-by-step).
* **Benefit**: Ledger commits from PostgreSQL never block the matching latency.

---

## ⚡ Durability & State Recovery (AOF + Snapshots)

Since matching data lives in the engine's RAM, TradeOn uses a hybrid Redis storage policy to survive engine restarts and node crashes:
1. **Append-Only File (AOF)**: Every queued order popped by the engine is instantly written into an `engine.aof` file in append-only fashion.
2. **State Snapshots**: Every 5 seconds, the engine serializes the complete in-memory balances and orderbooks state to Redis (`snapshot:engine_state`).
3. **Recovery**: On boot, the engine reinstates the latest state snapshot and replays trailing transactions from the AOF to regain the correct state.

---

## 🛠️ Technology Stack
* **Frontend**: Next.js 15 (App Router with Turbopack), Tailwind CSS, Lucide React icons.
* **Backend**: Node.js/Express, Socket.io, Clerk Auth, ioredis.
* **Databases**: PostgreSQL ( Neon Serverless / Local Docker ), Redis.
* **ORM**: Drizzle ORM.

---

## 🚀 Running Guide

### Prerequisites
Make sure **Docker** and **Node.js** (v20+) are installed.

### 1. Spin up Databases
Start the local Redis and Postgres database instances in background mode:
```bash
docker compose up database redis -d
```

### 2. Configure Environment `.env`
Specify environment variables in the project root file `.env`:
```env
DATABASE_URL=postgresql://master:%2329GGvu2oq@localhost:5432/postgres
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SIGNING_SECRET=whsec_...
REDIS_URL=redis://localhost:6379
```

And in the engine directory `engine/.env`:
```env
DATABASE_URL=postgresql://master:%2329GGvu2oq@localhost:5432/postgres
ENGINE_PORT=4000
FRONTEND_URL=http://localhost:3000
REDIS_URL=redis://localhost:6379
CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

### 3. Hydrate Db Schema
Sync Drizzle models to local database columns:
```bash
cd engine
npx drizzle-kit push
```

### 4. Start Microservices
Launch the individual runners in four different terminals/panes:

* **Tab 1: Next.js Frontend** (Project root)
  ```bash
  npm run dev
  ```
* **Tab 2: Web Server (API Gateway)** (`/engine`)
  ```bash
  npm run dev
  ```
* **Tab 3: Match Engine Process** (`/engine`)
  ```bash
  npm run engine
  ```
* **Tab 4: Persistence Writer** (`/engine`)
  ```bash
  npm run persistence
  ```

---

## 🧪 Seeding & Mocking Balances
To bypass setting up public webhook certs locally:
```bash
cd engine
npm run seed-user <your-clerk-user-id>
```
This pushes a `USER_SYNC` transaction to the match engine queue, granting your Clerk account a test balance of **₹50,000.00** instantly.
