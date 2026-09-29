# Full-stack Technical Test — Authentication System

## Overview

สร้างระบบ Authentication ขนาดเล็ก โดยเน้นการพัฒนา **Backend API ด้วย NestJS** และเชื่อมต่อกับ **Frontend ด้วย Next.js**

โจทย์นี้ใช้เพื่อประเมินความสามารถด้าน:

* Backend API Development
* Authentication
* Database Design
* Validation & Error Handling
* API Integration
* Frontend Development
* Code Structure & Development Approach

> **Time Limit: 40 minutes**

---

## Tech Stack

### Required

**Frontend**

* Next.js
* TypeScript

**Backend**

* NestJS
* TypeScript

### Database

เลือกใช้ได้ตามความถนัด

* PostgreSQL
* MySQL
* SQLite

### ORM

เลือกใช้ได้ตามความถนัด

* Prisma
* TypeORM
* หรือ ORM ที่ถนัด

---

# Requirements

## 1. Register

สร้าง API สำหรับสมัครสมาชิก

```http
POST /auth/register
```

Request:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Requirements:

* Email ต้องเป็นรูปแบบที่ถูกต้อง
* Password ต้องมีความยาวอย่างน้อย 8 ตัวอักษร
* Email ต้องไม่สามารถสมัครซ้ำได้
* Password ต้องไม่ถูกเก็บเป็น Plain Text
* API ต้องส่ง HTTP Status Code ที่เหมาะสม
* กรณีเกิด Error ควรส่ง Response ที่ Frontend สามารถนำไปแสดงผลได้

---

## 2. Login

สร้าง API สำหรับ Login

```http
POST /auth/login
```

Request:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

เมื่อ Login สำเร็จ ให้สร้าง Authentication สำหรับ User

สามารถเลือกวิธีที่เหมาะสมได้ เช่น:

* JWT
* HTTP-only Cookie
* หรือวิธีอื่นที่เหมาะสม

ตัวอย่าง Response:

```json
{
  "accessToken": "..."
}
```

หรือสามารถออกแบบ Response ในรูปแบบอื่นได้ตามความเหมาะสม

กรณี Email หรือ Password ไม่ถูกต้อง ต้องไม่เปิดเผยข้อมูลที่ไม่จำเป็น เช่นระบุว่า Email มีอยู่ในระบบหรือไม่

---

## 3. Get Current User

สร้าง Protected API สำหรับดูข้อมูล User ที่ Login อยู่

```http
GET /users/me
```

API นี้ต้องสามารถเรียกได้เฉพาะ User ที่ผ่าน Authentication แล้ว

ตัวอย่าง Response:

```json
{
  "id": 1,
  "email": "user@example.com"
}
```

ไม่ควรส่ง Password กลับไปใน Response

---

# Frontend Requirements

สร้างหน้าเว็บอย่างง่ายเพื่อทดสอบ API

## Login Page

```text
/login
```

ประกอบด้วย:

* Email
* Password
* Login Button

เมื่อ Login สำเร็จ ให้ไปยังหน้า Profile

---

## Profile Page

```text
/profile
```

ต้อง:

* เรียก `GET /users/me`
* แสดงข้อมูล User
* ถ้า User ยังไม่ได้ Login ให้จัดการกรณี Unauthorized อย่างเหมาะสม
* มีปุ่ม Logout

---

## UI

ไม่จำเป็นต้องออกแบบ UI ให้สวยหรือซับซ้อน

สามารถใช้ CSS / Tailwind CSS / Component Library ที่ถนัดได้

สิ่งที่ต้องการดูคือ:

* Component Structure
* State Management
* API Integration
* Loading State
* Error Handling
* Basic Responsive UI

---

# Backend Expectations

ไม่จำเป็นต้องทำทุกอย่างให้สมบูรณ์แบบ แต่ควรแสดงให้เห็นแนวทางการออกแบบที่เหมาะสม

ตัวอย่างเช่น:

```text
src/
├── auth/
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── ...
│
├── users/
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── ...
│
└── ...
```

ควรพิจารณาเรื่อง:

* Separation of Concerns
* DTO / Validation
* Password Hashing
* Authentication
* HTTP Status Codes
* Error Handling
* Database Schema
* Security

ไม่จำเป็นต้องยึดโครงสร้างตัวอย่างด้านบน หากมีแนวทางอื่นที่เห็นว่าเหมาะสม

---

# API Validation

ควรมี Validation ทั้งข้อมูลที่รับเข้ามาและข้อมูลที่ส่งกลับออกไปตามความเหมาะสม

ตัวอย่างกรณีที่ควรจัดการ:

### Invalid Email

```json
{
  "email": "abc",
  "password": "12345678"
}
```

### Short Password

```json
{
  "email": "user@example.com",
  "password": "123"
}
```

### Duplicate Email

```text
user@example.com already exists
```

### Invalid Login

```text
Incorrect email or password
```

---

# Bonus

หากทำ Requirements หลักเสร็จก่อนเวลา สามารถเพิ่มเติมสิ่งต่อไปนี้ได้:

* Refresh Token
* Logout / Token Invalidation
* Unit Test / Integration Test
* Docker
* Swagger / OpenAPI
* Rate Limiting
* Role / Authorization
* Better Error Response Structure

> **Bonus ไม่จำเป็นต้องทำให้เสร็จภายใน 40 นาที**
>
> ให้ความสำคัญกับ Requirements หลักและคุณภาพของ Code ก่อน

---

# What We Will Evaluate

การทดสอบนี้ไม่ได้วัดเพียงว่า Application สามารถ Run ได้หรือไม่

เราจะพิจารณา:

### Backend — Primary

* API Design
* Authentication
* Password Security
* Validation
* Error Handling
* Database Design
* Code Structure
* Separation of Concerns
* Understanding of NestJS

### Frontend — Secondary

* Next.js Structure
* API Integration
* Authentication Flow
* State Management
* Error / Loading Handling
* Component Structure
* Basic UI/UX

### Engineering Approach

* Code readability
* Naming
* Problem solving
* Trade-offs
* Ability to prioritize within limited time

---

# Time Management

**Total Time: 40 minutes**

แนะนำให้แบ่งเวลาโดยประมาณ:

```text
Backend / Database / API     ~25 minutes
Frontend                     ~10 minutes
Testing / Cleanup             ~5 minutes
```

ไม่จำเป็นต้องทำทุกอย่างให้ครบ หากเวลาไม่เพียงพอ

**Quality และแนวทางการแก้ปัญหา สำคัญกว่าปริมาณ Feature**

---

# Submission

สามารถส่ง Project ผ่าน Git Repository เช่น GitHub / GitLab

README ควรระบุ:

1. วิธีติดตั้งและ Run Project
2. Environment Variables ที่ต้องใช้
3. วิธี Run Database
4. วิธี Run Backend
5. วิธี Run Frontend
6. API ที่สร้างขึ้น
7. Design Decisions ที่สำคัญ
8. สิ่งที่ทำไม่เสร็จภายในเวลาที่กำหนด (ถ้ามี)

ตัวอย่าง:

```bash
# Backend
npm install
npm run start:dev

# Frontend
npm install
npm run dev
```

---

# Important

คุณสามารถเลือก Library, ORM, Authentication Strategy และ Project Structure ที่ถนัดได้

ไม่มีคำตอบเดียวที่ถูกต้อง

สิ่งสำคัญคือสามารถอธิบายได้ว่า:

> **ทำไมจึงเลือกวิธีนั้น และมีข้อดีข้อเสียอย่างไร**
