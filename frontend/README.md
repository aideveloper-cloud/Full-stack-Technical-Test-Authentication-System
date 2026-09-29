# Frontend

Next.js frontend สำหรับทดสอบ Backend — **ทำเสร็จแล้ว ไม่ต้องแก้ไข**

```bash
npm install
npm run dev   # http://localhost:3000
```

| Route | หน้าที่ |
| --- | --- |
| `/register` | สมัครสมาชิก (`POST /auth/register`) แล้ว Login ต่ออัตโนมัติ |
| `/login` | Login (`POST /auth/login`) เก็บ `accessToken` ไว้ใน `localStorage` |
| `/profile` | แสดงข้อมูลจาก `GET /users/me` ถ้าได้ `401` จะกลับไปหน้า Login |

ตั้งค่า Backend URL ได้ด้วย `NEXT_PUBLIC_API_URL` (ดู `.env.example`)
