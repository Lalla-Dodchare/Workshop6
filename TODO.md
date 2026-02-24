# Workshop 6 — File Manager (Web Application)

## สถานะตอนนี้: งานหลักเสร็จ 100% ✅

---

## งานหลัก (เสร็จแล้วทั้งหมด)

### Backend (server.js)
- [x] POST /login + JWT token
- [x] middleware authenticateToken
- [x] POST /upload (แยกโฟลเดอร์ตาม user id)
- [x] GET /files (user เห็นแค่ตัวเอง, admin เห็นทุกคน)
- [x] GET /download/:filename
- [x] GET /download/:owner/:filename (admin)
- [x] DELETE /files/:filename (user)
- [x] DELETE /files/:owner/:filename (admin)
- [x] serve static files

### หน้า User (page/user/home.html)
- [x] Layout + Tailwind
- [x] เช็ค token + redirect ถ้าไม่มี
- [x] แสดงชื่อ user บน navbar
- [x] loadFiles() — แสดงรายการไฟล์
- [x] Upload + FormData
- [x] Preview รูปก่อน upload (FileReader)
- [x] Download (fetch + blob)
- [x] Delete + confirm ก่อนลบ
- [x] Logout

### หน้า Admin (page/admin/dashboard.html + admin.js)
- [x] Layout + Tailwind
- [x] เช็ค token + redirect ถ้าไม่มี
- [x] loadFiles() — เห็นไฟล์ทุก user พร้อมชื่อเจ้าของ
- [x] Download
- [x] Delete + confirm ก่อนลบ
- [x] Logout

### Login (index.html + script.js)
- [x] หน้า Login + Tailwind
- [x] fetch POST /login → เก็บ token → redirect ตาม role

---

## งาน Extra (ยังไม่ได้ทำ — ทำเพิ่มเพื่อความโหด)

### ฝั่ง User
- [ ] Register — สมัครสมาชิก (POST /register ใน server.js + หน้า register)
- [ ] Preview ดีขึ้น — modal popup สำหรับรูป, iframe สำหรับ PDF
- [ ] Share ไฟล์ให้คนอื่น + แสดงว่าใครแชร์
- [ ] Filter/Search ชื่อไฟล์ realtime
- [ ] UI สวยขึ้น — hover effect, ปุ่มสีสัน, แสดงขนาดไฟล์

### ฝั่ง Admin
- [ ] Filter กรองชื่อ User (dropdown)
- [ ] Filter กรองประเภทไฟล์ (รูป/PDF/อื่นๆ)
- [ ] Search ชื่อไฟล์ realtime
- [ ] UI สวยขึ้น

---

## ความรู้ที่เรียนแล้ว

- HTTP request structure (URL, Method, Headers, Body)
- req.body, req.params, req.headers, req.user, req.file
- express.json() แปลง JSON string → object
- JWT 3 ส่วน (Header, Payload, Signature)
- jwt.sign() สร้าง token / jwt.verify() เช็ค token
- middleware pattern (req, res, next)
- localStorage เก็บ token
- Authorization: Bearer token
- multer แยกโฟลเดอร์ตาม user
- FormData ส่งไฟล์
- FileReader preview ก่อน upload
- fetch + blob สำหรับ download
- confirm() ยืนยันก่อนลบ
- addEventListener, createElement, appendChild, innerHTML
- classList.add/remove ('hidden')
- async/await vs .then()
- git add, commit, push, pull
