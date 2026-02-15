# Workshop 6 — File Manager (Web Application)

## สิ่งที่ต้องทำ

### ระบบ Login
- [x] หน้า Login (index.html) — HTML + Tailwind
- [x] API POST /login (server.js) — เช็ค username/password
- [ ] ใส่ JWT ใน login — server สร้าง token ส่งกลับ client
- [ ] เขียน script.js — login logic, เก็บ token ใน localStorage, redirect ตาม role
- [ ] middleware ตรวจ token — ตรวจทุก request ว่า login แล้วหรือยัง

### หน้า User (page/user/home.html)
- [ ] Upload ไฟล์ (เห็นแค่ไฟล์ตัวเอง)
- [ ] Download ไฟล์
- [ ] Preview ไฟล์ก่อน upload (FileReader)
- [ ] ลบไฟล์ + confirm() ก่อนลบ
- [ ] แสดงรายการไฟล์ของตัวเอง
- [ ] ปุ่ม Logout (ลบ token จาก localStorage → redirect กลับ login)

### หน้า Admin (page/admin/dashboard.html)
- [ ] เห็นไฟล์ทั้งหมดของทุก user
- [ ] ลบไฟล์ของใครก็ได้ + confirm ก่อนลบ
- [ ] ดูแล/จัดการ user (ดูรายชื่อ, ควบคุมการเข้าถึง)
- [ ] ปุ่ม Logout

### Backend (server.js)
- [x] POST /login
- [x] POST /upload
- [x] GET /files
- [x] GET /download/:filename
- [x] serve static files (express.static)
- [x] import jsonwebtoken
- [ ] สร้าง JWT token ตอน login สำเร็จ (jwt.sign)
- [ ] middleware ตรวจ token (jwt.verify)
- [ ] DELETE /files/:filename (ลบไฟล์)
- [ ] แยกไฟล์ตาม user (upload ไปโฟลเดอร์ของแต่ละคน)

### UI/UX
- [x] Tailwind CSS หน้า Login
- [ ] Tailwind CSS หน้า User
- [ ] Tailwind CSS หน้า Admin

---

## Flow การทำงานทั้งระบบ (ละเอียด)

### 1. Login
```
fe: user กรอก username + password กด submit
fe: script.js → fetch POST /login { username, password }
                        ↓
be: server.js → app.post('/login') รับ req.body
be: server.js → users.find() เช็คว่ามี user นี้มั้ย
be: server.js → ถ้าไม่มี → res.status(401) { error }
be: server.js → ถ้ามี → jwt.sign({ id, username, role }, SECRET_KEY) สร้าง token
be: server.js → res.json({ token, user }) ส่งกลับ
                        ↓
fe: script.js → ได้ token กลับมา
fe: script.js → localStorage.setItem('token', token)
fe: script.js → เช็ค role → redirect ไป /page/admin/ หรือ /page/user/
```

### 2. เปิดหน้า Dashboard (ทุกครั้ง)
```
fe: เปิด dashboard.html → โหลด script
fe: script.js → token = localStorage.getItem('token')
fe: script.js → ถ้าไม่มี token → redirect กลับ index.html
fe: script.js → ถ้ามี → fetch GET /files + header { Authorization: 'Bearer ' + token }
                        ↓
be: server.js → middleware ตรวจ token
be: server.js → jwt.verify(token, SECRET_KEY) → ได้ { id, username, role }
be: server.js → ถ้า token ไม่ถูก → res.status(401)
be: server.js → ถ้าถูก → req.user = decoded → next()
be: server.js → app.get('/files') → อ่านโฟลเดอร์ → res.json([ไฟล์])
                        ↓
fe: script.js → ได้ [ไฟล์] กลับมา → วนลูปแสดงบนหน้าเว็บ
```

### 3. Upload ไฟล์
```
fe: user เลือกไฟล์ → FileReader แสดง preview
fe: user กด Upload
fe: script.js → FormData.append('file', ไฟล์)
fe: script.js → fetch POST /upload + FormData + header Authorization
                        ↓
be: server.js → middleware ตรวจ token → ได้ req.user
be: server.js → multer รับไฟล์ → เก็บใน uploads/{username}/
be: server.js → res.json({ message: 'สำเร็จ' })
                        ↓
fe: script.js → แสดง "upload สำเร็จ"
fe: script.js → fetch GET /files → โหลดรายการใหม่
```

### 4. Download ไฟล์
```
fe: user กดปุ่ม download
fe: browser → GET /download/{filename}
                        ↓
be: server.js → middleware ตรวจ token
be: server.js → res.download(filePath) ส่งไฟล์กลับ
                        ↓
fe: browser → โหลดไฟล์ลงเครื่อง
```

### 5. ลบไฟล์
```
fe: user กดปุ่มลบ
fe: script.js → confirm('ลบจริงมั้ย?') → ถ้ากด Cancel จบ
fe: script.js → ถ้ากด OK → fetch DELETE /files/{filename} + header Authorization
                        ↓
be: server.js → middleware ตรวจ token → ได้ req.user
be: server.js → เช็คสิทธิ์ (user ลบได้แค่ของตัวเอง, admin ลบได้หมด)
be: server.js → fs.unlink() ลบไฟล์จริง
be: server.js → res.json({ message: 'ลบสำเร็จ' })
                        ↓
fe: script.js → fetch GET /files → โหลดรายการใหม่
```

### 6. Logout
```
fe: user กดปุ่ม Logout
fe: script.js → localStorage.removeItem('token')
fe: script.js → window.location.href = '/index.html'
(ไม่ต้องยุ่งกับ server เลย แค่ลบ token ฝั่ง client จบ)
```

---

## ลำดับที่ควรทำต่อ

1. ใส่ JWT ใน server.js (login สร้าง token)
2. เขียน script.js (login → เก็บ token → redirect)
3. สร้าง middleware ตรวจ token
4. ทำหน้า User (upload/download/list/delete)
5. ทำหน้า Admin

---

## ความรู้ที่เรียนแล้ว

- Fetch API vs REST API (คนส่ง vs คนรับ)
- JWT 3 ส่วน (Header, Payload, Signature)
- localStorage เก็บ token
- req.headers.authorization (Bearer token)
- server สร้าง token, client แค่เก็บแล้วส่งกลับ
- middleware, FileReader, confirm() ไม่ต้อง install
- fe = frontend (script.js, browser) / be = backend (server.js, Node.js)

---

## สรุป req (request) ทั้งหมดที่ใช้ในโปรเจคนี้

HTTP request เหมือนจดหมาย มีหลายส่วน:

```
┌─────────────────────────────────────────────────────────┐
│  URL      → ที่อยู่ผู้รับ         เช่น /login, /files     │
│  Method   → ประเภทจดหมาย       เช่น GET, POST, DELETE  │
│  Headers  → ข้อมูลบนซอง         เช่น Authorization      │
│─────────────────────────────────────────────────────────│
│  Body     → เนื้อหาในจดหมาย     เช่น { username, password } │
└─────────────────────────────────────────────────────────┘
```

### req.body — เนื้อหาที่ client ส่งมา
- client ส่ง JSON มา เช่น `{ "username": "admin", "password": "admin123" }`
- server ดึงใช้ผ่าน `req.body.username`, `req.body.password`
- เขียนสั้นๆ ด้วย destructuring: `const { username, password } = req.body;`
- **สำคัญ:** ต้องมี `app.use(express.json())` ก่อน ไม่งั้น req.body = undefined
- ใช้กับ POST, PUT, DELETE (method ที่ส่งข้อมูลมา)
- GET ไม่มี body (แค่ขอดู ไม่ได้ส่งข้อมูลมา)

### req.params — ค่าที่อยู่ใน URL path
- กำหนด route เป็น `/download/:filename`
- ถ้า client เรียก `/download/cat.jpg`
- `req.params.filename` = `"cat.jpg"`
- `:filename` คือ placeholder — express จับค่าจาก URL ให้อัตโนมัติ

### req.headers — ข้อมูลบนซอง (metadata)
- client ส่ง header มาพร้อม request เช่น `Authorization: "Bearer eyJhbG..."`
- server ดึงใช้ผ่าน `req.headers.authorization`
- ใช้สำหรับส่ง token ยืนยันตัวตนหลัง login

### req.user — ข้อมูล user (เราสร้างเอง)
- ไม่ได้มีมาตั้งแต่แรก — เราใส่เองใน middleware หลัง verify token
- middleware ตรวจ token → ถอดข้อมูลออกมา → ใส่ `req.user = { id, username, role }`
- route ถัดไปเรียกใช้ `req.user.username` ได้เลย เพื่อรู้ว่าใครส่ง request มา

### req.file — ไฟล์ที่ upload มา (จาก multer)
- ใช้กับ `upload.single('file')` middleware
- `req.file.filename` = ชื่อไฟล์ที่เก็บ
- `req.file.originalname` = ชื่อไฟล์ต้นฉบับ

### สรุปสั้น
| ใช้อะไร | ได้อะไร | ตัวอย่าง |
|---------|---------|----------|
| `req.body` | ข้อมูล JSON ที่ส่งมา | `{ username, password }` |
| `req.params` | ค่าจาก URL | `/download/:filename` → `req.params.filename` |
| `req.headers` | header เช่น token | `req.headers.authorization` |
| `req.user` | ข้อมูล user (ใส่เองใน middleware) | `{ id, username, role }` |
| `req.file` | ไฟล์ upload (จาก multer) | `req.file.filename` |

### เสริม: express.json() คืออะไร?
```js
app.use(express.json());
```
- client ส่งข้อมูลมาเป็น JSON string: `'{"username":"admin"}'`
- express.json() แปลงให้เป็น JavaScript object อัตโนมัติ
- ถ้าไม่มี → req.body = undefined → ดึงข้อมูลไม่ได้

### เสริม: destructuring คืออะไร?
```js
// เขียนยาว
const username = req.body.username;
const password = req.body.password;

// เขียนสั้น (destructuring) — ได้ผลเหมือนกัน
const { username, password } = req.body;
```

---

## บทบาทผู้ช่วย (Claude)

- สร้างโค้ดตัวอย่างพร้อม comment ให้แกะ
- อธิบายเมื่อถาม ไม่ทำให้ทั้งหมดโดยไม่สอน
- ทำทีละขั้น ไม่กระโดดข้ามขั้นตอน
