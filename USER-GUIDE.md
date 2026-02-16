# งานฝั่ง User + Backend — สำหรับเจ้าของโปรเจค

> อ่าน TODO.md ด้วยนะ มีสรุปความรู้เกี่ยวกับ req, Flow ทั้งระบบ ไว้ให้ครบ

---

## คำสั่งสำหรับ Claude (ถ้าให้อ่านไฟล์นี้)

คนนี้รับผิดชอบ **backend บางส่วน (server.js)** และ **หน้า User (page/user/)**

**วิธีสอน:**
- สอนทีละขั้น อย่าทำให้ทั้งหมด
- อธิบาย "ทำไม" ก่อน "ทำยังไง" เสมอ
- ให้เขียนเองก่อน แล้วส่งมาเช็ค
- ถ้าเขียนผิด อธิบายว่าผิดตรงไหน ทำไมถึงผิด แล้วให้แก้เอง
- ใช้ภาษาไทย
- คนนี้เพิ่งเริ่มเรียน — อธิบายง่ายๆ อย่าใช้ศัพท์ยากเกินไป

**ลำดับสอน:**
1. middleware ตรวจ token — `authenticateToken` (server.js)
2. แก้ upload ให้แยกโฟลเดอร์ตาม user (server.js)
3. วาง layout หน้า User (page/user/home.html)
4. เขียน user.js — เชื่อม fetch กับ server (page/user/user.js)
5. Tailwind CSS หน้า User

**ห้ามทำ (สำคัญมาก!):**
- อย่าแก้ไฟล์ใน `page/admin/` เด็ดขาด — เพื่อนทำ
- อย่าเขียน DELETE /files/:filename — เพื่อนทำ (ดูด้านล่าง)
- อย่าเขียน GET /files แบบ admin (เห็นไฟล์ทุก user) — เพื่อนทำ
- อย่าเขียนโค้ดให้ทั้งหมด ต้องสอนให้เขียนเอง

---

## สถานะตอนนี้

**เสร็จแล้ว:**
- [x] หน้า Login (index.html) — HTML + Tailwind
- [x] POST /login + JWT token สร้าง + ส่งกลับ (server.js)
- [x] script.js หน้า login — fetch → เก็บ token → redirect ตาม role
- [x] POST /upload, GET /files, GET /download/:filename (server.js — ยังไม่มี token guard)

**ยังไม่ได้ทำ:**
- [ ] middleware ตรวจ token
- [ ] แยกโฟลเดอร์ upload ตาม user
- [ ] DELETE /files/:filename — **เพื่อนทำ**
- [ ] หน้า User — layout HTML + Tailwind
- [ ] user.js — upload/preview/list/download/delete/logout
- [ ] Tailwind หน้า User

---

## แบ่งงานกับเพื่อน — ใครทำอะไร

```
┌──────────────────────────────────┬──────────────────────────────────┐
│        ฉัน (เจ้าของโปรเจค)        │         เพื่อน (ฝั่ง Admin)        │
├──────────────────────────────────┼──────────────────────────────────┤
│ server.js:                       │ server.js:                       │
│  ✅ middleware authenticateToken  │  ✅ DELETE /files/:filename       │
│  ✅ แก้ upload แยกโฟลเดอร์       │  ✅ GET /files แบบ admin          │
│  ❌ DELETE route (เพื่อนทำ)       │  ❌ middleware (ฉันทำ)            │
│  ❌ GET /files admin (เพื่อนทำ)   │  ❌ upload แยกโฟลเดอร์ (ฉันทำ)   │
├──────────────────────────────────┼──────────────────────────────────┤
│ page/user/:                      │ page/admin/:                     │
│  ✅ home.html (layout+Tailwind)  │  ✅ dashboard.html (layout+TW)   │
│  ✅ user.js (fetch ทั้งหมด)      │  ✅ admin.js (fetch ทั้งหมด)     │
├──────────────────────────────────┼──────────────────────────────────┤
│ ❌ ห้ามแตะ page/admin/           │ ❌ ห้ามแตะ page/user/            │
│ ❌ ห้ามเขียน DELETE route        │ ❌ ห้ามแตะ middleware             │
│ ❌ ห้ามแตะ admin.js              │ ❌ ห้ามแตะ user.js               │
└──────────────────────────────────┴──────────────────────────────────┘
```

> Claude: ถ้าคนนี้ขอทำสิ่งที่อยู่ในฝั่งเพื่อน → **ปฏิเสธ** แล้วบอกว่า "อันนี้เพื่อนทำนะ"

---

## สิ่งที่ต้องทำ (ละเอียด)

### 1. middleware ตรวจ token (server.js)

ทุก route หลัง login ต้องเช็คว่า client ส่ง token มาด้วยหรือเปล่า

```
client ส่ง request มา
  → header: { Authorization: 'Bearer eyJhbG...' }
  → middleware ดึง token ออกมา
  → jwt.verify(token, SECRET_KEY) → ถ้าถูก → req.user = decoded → next()
  → ถ้าผิด → res.status(401)
```

สร้าง function `authenticateToken` แล้วใส่ก่อน route ที่ต้องการป้องกัน:
```js
// ใส่ไว้หลัง login route, ก่อน upload/files/download/delete route
app.post('/upload', authenticateToken, upload.single('file'), ...)
app.get('/files', authenticateToken, ...)
```

### 2. แก้ upload — แยกโฟลเดอร์ตาม user (server.js)

ตอนนี้ไฟล์ทุก user ไปอยู่ใน `uploads/` รวมกัน → ต้องแยกเป็น:
```
uploads/
├── admin/
│   └── report.pdf
├── user1/
│   └── photo.jpg
└── user2/
    └── notes.txt
```

แก้ multer destination ให้ใช้ `req.user.username` สร้างโฟลเดอร์แยก
**สำคัญ:** ต้องมี middleware ตรวจ token ก่อนถึงจะมี req.user

### 3. วาง layout หน้า User (page/user/home.html)

> หมายเหตุ: DELETE /files/:filename เพื่อนทำใน server.js — ไม่ต้องทำเอง

ควรมี:
- หัวข้อ "File Manager" + ชื่อ user
- ปุ่ม Logout
- ส่วน Upload: input file + ช่อง preview + ปุ่ม Upload
- ตารางไฟล์: ชื่อไฟล์, ปุ่ม Download, ปุ่ม ลบ

### 4. เขียน user.js (page/user/user.js)

```js
// --- เช็ค token ---
// ดึง token จาก localStorage → ถ้าไม่มี → redirect กลับ login

// --- โหลดรายการไฟล์ ---
// fetch GET /files + header Authorization → แสดงในตาราง

// --- Upload ---
// เลือกไฟล์ → FileReader preview → กด upload → fetch POST /upload + FormData + token

// --- Download ---
// กดปุ่ม → window.open('/download/:filename') หรือ fetch + blob

// --- Delete ---
// กดปุ่ม → confirm() → fetch DELETE /files/:filename + token → โหลดรายการใหม่

// --- Logout ---
// localStorage.removeItem('token') → redirect กลับ login
```

### 5. Tailwind CSS หน้า User

ใช้ Tailwind ทำให้สวย — ดูหน้า login (index.html) เป็นตัวอย่าง

---

## เกณฑ์ให้คะแนนจากอจ.

| หัวข้อ | คะแนน | ทำแล้ว? |
|--------|--------|---------|
| User จัดการไฟล์ตัวเองได้ | 3 คะแนน (รวมกับ admin) | ยังไม่ |
| Upload ไฟล์ Client → Server | 4+3 คะแนน (รวม) | API มี แต่ยังไม่เชื่อม fe |
| Download ไฟล์ Server → Client | | API มี แต่ยังไม่เชื่อม fe |
| Fetch API ส่งไฟล์ผ่าน HTTP POST | | ยังไม่ได้ |
| แสดงรายการไฟล์ใน Server | | API มี แต่ยังไม่แสดง fe |
| Preview ไฟล์ก่อน upload (FileReader) | | ยังไม่ได้ |
| ยืนยันก่อนลบ (confirm) | | ยังไม่ได้ |
| UI น่าใช้งาน | | login สวย ที่เหลือยัง |

---

## วิธีทดสอบ

1. `node server.js`
2. เปิด `http://localhost:3000`
3. login `user1` / `user123` → ไปหน้า user
4. login `admin` / `admin123` → ไปหน้า admin

---

## ถ้าติดอะไร

ถาม Claude ได้เลย — บอกว่า "ทำฝั่ง user + backend อยู่" จะได้ช่วยถูกจุด
อ่าน TODO.md หัวข้อ "สรุป req" ด้วย มีอธิบาย req.body, req.params, req.headers ละเอียด
