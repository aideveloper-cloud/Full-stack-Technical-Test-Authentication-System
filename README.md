# Full-stack Technical Test — Authentication System (Backend Focus)

## Overview

สร้าง **Backend API สำหรับระบบ Authentication ด้วย NestJS** ให้ทำงานร่วมกับ **Frontend (Next.js) ที่เตรียมไว้ให้แล้ว**

Frontend ใน repo นี้ทำเสร็จแล้ว (Register / Login / Profile) — งานของคุณคือทำให้ Backend รองรับ [API Contract](#api-contract) ด้านล่าง เมื่อ Backend ถูกต้อง Frontend จะใช้งานได้ทันที

โจทย์นี้ใช้ประเมิน:

* Backend API Design
* Authentication & Password Security
* Database Design
* Validation & Error Handling
* Code Structure / ความเข้าใจ NestJS
* Engineering Approach และการอธิบาย Trade-offs

---

## Time

| ช่วง | เวลา |
| --- | --- |
| Requirements หลัก | ~30 นาที |
| Bonus / Cleanup / README | ~10 นาที |
| **รวม (ลงมือเขียน)** | **40 นาที** |
| Code Review ร่วมกับผู้สัมภาษณ์ | ~15 นาที |

ไม่จำเป็นต้องทำทุกอย่างให้ครบ — **คุณภาพและแนวทางการแก้ปัญหา สำคัญกว่าจำนวน Feature**

---

## กติกาการใช้ AI

ใช้ AI (ChatGPT, Claude, Copilot ฯลฯ) ได้ **ในฐานะผู้ช่วย** เหมือนการเปิด Docs — แต่ **ห้าม Vibe Code**

**ทำได้**

* ถามแนวคิด / วิธีใช้ Library / Syntax
* ให้ช่วยอธิบาย Error Message
* Inline Autocomplete ทีละบรรทัด

**ไม่อนุญาต**

* ให้ AI เขียน Module / Feature / ไฟล์ทั้งก้อนแล้ววางลงไป
* ใช้ Agent Mode ที่แก้ไฟล์ให้เอง (เช่น Claude Code, Cursor Agent / Composer, Copilot Agent)
* วางโจทย์นี้ทั้งหมดให้ AI ทำ

หลังส่งงานจะมี **Code Review ร่วมกัน** คุณต้องอธิบายได้ทุกบรรทัดว่าทำไมเขียนแบบนั้น และจะได้รับโจทย์ให้แก้ไขหรือต่อยอดโค้ดของตัวเองสด ๆ

---

## Project Structure

```text
.
├── backend/    NestJS starter — คุณเขียนงานที่นี่
└── frontend/   Next.js — ทำเสร็จแล้ว ไม่ต้องแก้
```

### สิ่งที่เตรียมไว้ให้แล้ว

* `backend/` — NestJS project เปล่า (สร้างจาก `nest new`) รันที่ port **3001** และเปิด CORS ให้ `http://localhost:3000` แล้ว
* `frontend/` — หน้า `/register`, `/login`, `/profile` เรียก API ตาม Contract

### สิ่งที่คุณต้องทำ / เลือกเอง

* **Database** — PostgreSQL / MySQL / SQLite ตามถนัด
* **ORM** — Prisma / TypeORM / Drizzle / อื่น ๆ ตามถนัด
* Library สำหรับ Validation, Password Hashing, JWT ฯลฯ
* Database Schema และโครงสร้าง Module ทั้งหมด

> แนะนำให้เลือกสิ่งที่ Setup ได้เร็วบนเครื่องของคุณ ถ้าใช้ Docker ให้ใส่ `docker-compose.yml` มาด้วย

---

## Getting Started

```bash
# Backend
cd backend
npm install
npm run start:dev      # http://localhost:3001

# Frontend (อีก terminal)
cd frontend
npm install
npm run dev            # http://localhost:3000
```

Frontend อ่าน URL ของ Backend จาก `NEXT_PUBLIC_API_URL` (default `http://localhost:3001`)

---

## API Contract

Frontend ถูกเขียนตาม Contract นี้ — **ต้องทำให้ตรง**

### Error Response

ทุก Error ต้องเป็น JSON ที่มี field `message` (เป็น `string` หรือ `string[]`) เช่น Response มาตรฐานของ NestJS:

```json
{
  "statusCode": 400,
  "message": ["email must be an email"],
  "error": "Bad Request"
}
```

---

### 1. Register

```http
POST /auth/register
Content-Type: application/json
```

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

| กรณี | Status | Response |
| --- | --- | --- |
| สำเร็จ | `201` | `{ "id": 1, "email": "user@example.com" }` |
| Email ไม่ถูกรูปแบบ / Password สั้นกว่า 8 ตัว / ข้อมูลไม่ครบ | `400` | Error Response |
| Email ซ้ำ | `409` | Error Response เช่น `user@example.com already exists` |

Requirements:

* Email ต้องเป็นรูปแบบที่ถูกต้อง
* Password ต้องยาวอย่างน้อย 8 ตัวอักษร
* Email ต้องไม่สามารถสมัครซ้ำได้
* **Password ต้องไม่ถูกเก็บเป็น Plain Text**
* **Response ต้องไม่มี Password / Password Hash**

---

### 2. Login

```http
POST /auth/login
Content-Type: application/json
```

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

| กรณี | Status | Response |
| --- | --- | --- |
| สำเร็จ | `200` | `{ "accessToken": "<JWT>" }` |
| ข้อมูลไม่ถูกรูปแบบ | `400` | Error Response |
| Email หรือ Password ไม่ถูกต้อง | `401` | Error Response: `Incorrect email or password` |

Requirements:

* ใช้ **JWT** เป็น Access Token
* กรณี Login ไม่ผ่าน **ต้องไม่เปิดเผย** ว่า Email มีอยู่ในระบบหรือไม่

---

### 3. Get Current User

```http
GET /users/me
Authorization: Bearer <accessToken>
```

| กรณี | Status | Response |
| --- | --- | --- |
| Token ถูกต้อง | `200` | `{ "id": 1, "email": "user@example.com" }` |
| ไม่มี Token / Token ไม่ถูกต้อง / หมดอายุ | `401` | Error Response |

Requirements:

* เรียกได้เฉพาะ User ที่ผ่าน Authentication แล้ว
* **ต้องไม่ส่ง Password กลับไป**

---

## Backend Expectations

ไม่จำเป็นต้องสมบูรณ์แบบ แต่ควรแสดงแนวทางการออกแบบที่เหมาะสม ตัวอย่างโครงสร้าง:

```text
backend/src/
├── auth/
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── ...
├── users/
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── ...
└── ...
```

ควรพิจารณา:

* Separation of Concerns
* DTO / Validation
* Password Hashing
* Authentication (Guard)
* HTTP Status Codes
* Error Handling
* Database Schema / Constraints
* Configuration & Secrets (ไม่ Hardcode)
* Security

ไม่จำเป็นต้องยึดโครงสร้างตัวอย่าง หากมีแนวทางอื่นที่เหมาะสมกว่า

---

## Bonus

ทำเมื่อ Requirements หลักเสร็จแล้วเท่านั้น (เลือกได้ตามถนัด)

* Unit Test สำหรับ `AuthService` หรือ e2e Test
* Rate Limiting สำหรับ `/auth/login`
* Refresh Token / Logout (Token Invalidation)
* Swagger / OpenAPI
* Docker / docker-compose
* Role / Authorization
* Error Response Structure ที่ดีขึ้น

---

## What We Will Evaluate

การทดสอบนี้ไม่ได้วัดแค่ว่า Application รันได้หรือไม่

### Backend

* API Design และความถูกต้องตาม Contract
* Authentication & Password Security
* Validation & Error Handling
* Database Design
* Code Structure / Separation of Concerns
* ความเข้าใจ NestJS (Module, DI, Pipe, Guard, Exception)

### Engineering Approach

* Code Readability & Naming
* Problem Solving & Prioritization ภายในเวลาจำกัด
* การอธิบาย Trade-offs ของสิ่งที่เลือก
* ความเข้าใจโค้ดของตัวเองในช่วง Code Review

---

## Submission

ส่งเป็น Git Repository (GitHub / GitLab) พร้อม Commit History

แก้ไข `backend/README.md` ให้ระบุสั้น ๆ (bullet ก็พอ):

1. Database / ORM ที่เลือก และวิธี Run Database
2. Environment Variables ที่ต้องใช้ (พร้อมไฟล์ `.env.example`)
3. วิธี Run Backend (รวม Migration ถ้ามี)
4. Design Decisions ที่สำคัญ และเหตุผล
5. สิ่งที่ทำไม่เสร็จภายในเวลา (ถ้ามี) และถ้ามีเวลาจะทำอะไรต่อ

---

## Important

เลือก Library, ORM และ Project Structure ได้ตามถนัด ไม่มีคำตอบเดียวที่ถูกต้อง

สิ่งสำคัญคือสามารถอธิบายได้ว่า:

> **ทำไมจึงเลือกวิธีนั้น และมีข้อดีข้อเสียอย่างไร**
