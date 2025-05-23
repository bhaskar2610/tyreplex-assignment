# 🛠️ TyrePlex Full-Stack Developer Assignment

This is a full-stack mini Order Flow System built as part of the TyrePlex technical assignment. It demonstrates OTP-based login, order creation, order history, and event logging via Kafka.

---

## 🚀 Tech Stack

### Backend (NestJS)
- NestJS
- Redis (OTP/session management)
- MySQL (Order storage)
- Kafka (Order event logging)
- JWT Authentication

### Frontend (Next.js)
- Next.js + TypeScript
- Axios for API calls
- Token-based auth using localStorage

---

## 📁 Folder Structure

```bash
tyreplex-assignment/
├── backend-nestjs/        # NestJS backend (API, OTP, Kafka)
├── frontend-nextjs/       # Next.js frontend (login + orders)
└── README.md              # This file
```

## ✅ Features

### Auth
- OTP-based login using mobile number
- OTP stored in Redis with TTL
- JWT token issued on OTP verification

### Orders
- Authenticated users can place new orders
- View own order history
- All orders logged to Kafka topic

---

## ⚙️ Backend Setup (NestJS)

### 1. Install Dependencies
```bash
cd backend-nestjs
npm install
```

### 2. Configure Environment
In `.env.development` file:

```env

DB_PASS=your_mql_root_password 
```

### 2. Create Database

```bash
cd backend-nestjs
npm run prestart



### 2. Run MySQL and Redis
You can run them locally or via Docker:

```bash
# MySQL
docker run --name mysql-dev -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=tyreplex -p 3306:3306 -d mysql

# Redis
docker run --name redis-dev -p 6379:6379 -d redis
```

### 3. Start Backend Server
```bash
npm run start:dev
```

---

## 💻 Frontend Setup (Next.js)

### 1. Install Dependencies
```bash
cd ../frontend-nextjs
npm install

npm install --force # If you are getting any versioning error.
```


### 2. Start Development Server
```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🧪 API Overview

### 1. Auth Routes

| Method | Route            | Body              | Description              |
|--------|------------------|-------------------|--------------------------|
| POST   | /auth/request-otp | { mobile }        | Request OTP              |
| POST   | /auth/verify-otp  | { mobile, otp }   | Verify OTP & get token   |

### 2. Order Routes (JWT Required)

| Method | Route    | Body         | Description          |
|--------|----------|--------------|----------------------|
| POST   | /orders  | { amount }   | Place new order      |
| GET    | /orders  | -            | View order history   |

---

## 📦 Kafka

### ✅ Kafka Topic Used
- `order-events`

### 📄 Sample Kafka Payload:
```json
{
  "order_id": 1,
  "timestamp": "2025-05-14T10:45:00Z"
}
```

All new orders trigger an event published to Kafka.

---


## 📌 Notes
- OTP is simulated (logged in the backend console)
- Make sure Redis and MySQL are running before starting the backend
- Protect `.env` files in real-world projects

---

## 🙌 Author
This project was built as a part of the TyrePlex Full-Stack Developer Assignment.