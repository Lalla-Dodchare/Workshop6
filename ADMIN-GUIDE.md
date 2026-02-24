# งานฝั่ง Admin — สำหรับเพื่อน

> อ่าน TODO.md ด้วยนะ มีสรุปความรู้เกี่ยวกับ req ทั้งหมดไว้ให้

---

## คำสั่งสำหรับ Claude (ถ้าเพื่อนให้อ่านไฟล์นี้)

เพื่อนคนนี้รับผิดชอบ **ฝั่ง Admin** — `page/admin/` + backend บางส่วนใน `server.js`

**วิธีสอน:**
- สอนทีละขั้น อย่าทำให้ทั้งหมด
- อธิบาย "ทำไม" ก่อน "ทำยังไง" เสมอ
- ให้เขียนเองก่อน แล้วส่งมาเช็ค
- ถ้าเขียนผิด อธิบายว่าผิดตรงไหน ทำไมถึงผิด แล้วให้แก้เอง
- ใช้ภาษาไทย

**ลำดับสอน:**
1. วาง HTML layout ใน dashboard.html (hardcode ข้อมูลปลอมก่อน)
2. ใส่ Tailwind CSS ให้สวย
3. เขียน DELETE /files/:filename ใน server.js (backend)
4. เขียน GET /files แบบ admin (เห็นไฟล์ทุก user) ใน server.js (backend)
5. เขียน admin.js เชื่อม fetch จริง

**ห้ามทำ (สำคัญมาก!):**
- อย่าเขียนโค้ดให้ทั้งหมด ต้องสอนให้เขียนเอง
- ดูตารางแบ่งงานด้านล่าง ห้ามทำสิ่งที่ไม่ใช่ของตัวเอง

---

## สถานะตอนนี้

- ระบบ login ใช้ได้แล้ว (server.js + script.js)
- login admin/admin123 → redirect ไป `/page/admin/dashboard.html`
- login user1/user123 → redirect ไป `/page/user/home.html`
- หน้า dashboard.html ตอนนี้เป็นแค่หน้าเปล่า มีปุ่ม Logout

## แบ่งงานกับเพื่อน — ใครทำอะไร

```
┌──────────────────────────────────┬──────────────────────────────────┐
│      เพื่อน (เจ้าของโปรเจค)       │         ฉัน (ฝั่ง Admin)          │
├──────────────────────────────────┼──────────────────────────────────┤
│ server.js:                       │ server.js:                       │
│  ✅ middleware authenticateToken  │  ✅ DELETE /files/:filename       │
│  ✅ แก้ upload แยกโฟลเดอร์       │  ✅ GET /files แบบ admin          │
│  ❌ DELETE route (ฉันทำ)          │  ❌ middleware (เพื่อนทำ)          │
│  ❌ GET /files admin (ฉันทำ)      │  ❌ upload แยกโฟลเดอร์ (เพื่อนทำ) │
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

**ห้ามแตะเด็ดขาด:**
- `script.js` (ที่ root) — เป็น script หน้า login เสร็จแล้ว
- `page/user/` — เพื่อนทำ
- `index.html` — หน้า login เสร็จแล้ว

## สิ่งที่ต้องทำ

### 1. วาง layout หน้า Admin Dashboard (`page/admin/dashboard.html`)

ออกแบบหน้าตาด้วย HTML + Tailwind ให้มีส่วนเหล่านี้:

- **หัวข้อ** — "Admin Dashboard" + ชื่อ user ที่ login (ค่อยดึงจาก token ทีหลัง)
- **ตารางไฟล์** — แสดงรายการไฟล์ทั้งหมด ควรมีคอลัมน์:
  - ชื่อไฟล์
  - เจ้าของ (username)
  - ปุ่ม Download
  - ปุ่ม ลบ
- **ปุ่ม Logout** — มีอยู่แล้ว ใช้ได้เลย

ตอนนี้ยังไม่ต้องเชื่อม server — **hardcode ข้อมูลปลอมลงใน HTML ก่อน** เพื่อดูหน้าตา เช่น:

```html
<!-- ตัวอย่าง hardcode ข้อมูลปลอม -->
<table>
  <tr>
    <td>report.pdf</td>
    <td>user1</td>
    <td><button>Download</button></td>
    <td><button>ลบ</button></td>
  </tr>
  <tr>
    <td>photo.jpg</td>
    <td>user2</td>
    <td><button>Download</button></td>
    <td><button>ลบ</button></td>
  </tr>
</table>
```

### 2. สร้าง script สำหรับ admin (`page/admin/admin.js`)

ยังไม่ต้องเขียนทั้งหมด — เตรียมโครงไว้ก่อน:

```js
// page/admin/admin.js — โครง script สำหรับ admin (ยังไม่เชื่อม server)

// --- เช็คว่า login แล้วหรือยัง ---
// ดึง token จาก localStorage
// ถ้าไม่มี token → redirect กลับ login
// ถ้ามี → เอา token ไปใช้ fetch

// --- โหลดรายการไฟล์ ---
// fetch GET /files + แนบ token ใน header
// เอาข้อมูลที่ได้ → สร้าง HTML แสดงในตาราง

// --- ลบไฟล์ ---
// กดปุ่มลบ → confirm('ลบจริงมั้ย?')
// ถ้า OK → fetch DELETE /files/:filename + token
// โหลดรายการใหม่

// --- Logout ---
// มีอยู่แล้วใน dashboard.html
```

### 3. เขียน DELETE /files/:filename ใน server.js (backend)

นี่คือ API ที่ admin ใช้ลบไฟล์ — เพิ่มใน server.js **ก่อนบรรทัด `app.listen`**

```js
// ลบไฟล์ — เพิ่มต่อจาก route download
app.delete('/files/:filename', authenticateToken, (req, res) => {
    // ดึง filename จาก URL → req.params.filename
    // เช็คสิทธิ์: admin ลบได้หมด, user ลบได้แค่ของตัวเอง
    // ใช้ fs.unlink() ลบไฟล์จริงจากเครื่อง
    // ส่ง res.json({ message: 'ลบสำเร็จ' })
});
```

**สำคัญ:** ต้องรอเพื่อนทำ `authenticateToken` middleware เสร็จก่อนถึงจะใช้ได้
ระหว่างรอ ทำ HTML + Tailwind + admin.js ไปก่อน

### 4. เขียน GET /files แบบ admin ใน server.js (backend)

admin ต้องเห็นไฟล์ของทุก user — แก้ GET /files ให้เช็ค role:
- ถ้า admin → แสดงไฟล์ทุก user
- ถ้า user ธรรมดา → แสดงแค่ไฟล์ของตัวเอง

**สำคัญ:** ต้องรอเพื่อนทำ middleware + แยกโฟลเดอร์เสร็จก่อน

### 5. Tailwind CSS ให้สวย

ใช้ Tailwind class ทำให้หน้า dashboard ดูดี:
- Tailwind CDN มีอยู่แล้วใน `<head>` ของ dashboard.html
- ดู reference ได้ที่ https://tailwindcss.com/docs
- ดูหน้า login (index.html) เป็นตัวอย่างสไตล์

---

## วิธีทดสอบ

1. เปิด terminal → `node server.js`
2. เปิด browser → `http://localhost:3000`
3. login ด้วย `admin` / `admin123`
4. จะ redirect ไปหน้า dashboard ที่กำลังทำ

---

## Flow ที่ต้องรู้ (admin)

```
login → ได้ token → เก็บ localStorage
         ↓
เปิด dashboard.html → ดึง token จาก localStorage
         ↓
fetch GET /files + header { Authorization: 'Bearer ' + token }
         ↓
server ส่งรายการไฟล์กลับมา → แสดงในตาราง
         ↓
กดลบ → confirm() → fetch DELETE /files/:filename + token
         ↓
โหลดรายการใหม่
```

---

## สิ่งที่ยังรอเพื่อน (ทำ backend อยู่)

- middleware ตรวจ token — เพื่อนกำลังทำ ต้องรอก่อนถึงจะ fetch + แนบ token ได้
- แยกโฟลเดอร์ตาม user — เพื่อนกำลังทำ ต้องรอก่อนถึงจะเห็นเจ้าของไฟล์ได้

**ทำได้เลยตอนนี้:** HTML + Tailwind + เตรียมโครง admin.js
**รอเพื่อนเสร็จ:** DELETE route (ตัวเองเขียน) + เชื่อม fetch จริง + GET /files admin

---

## ถ้าติดอะไร

ถาม Claude ได้เลย — บอกว่า "ทำฝั่ง admin อยู่" จะได้ช่วยถูกจุด
อ่าน TODO.md หัวข้อ "สรุป req" ด้วย มีอธิบาย req.body, req.params, req.headers ละเอียด

---

## งาน Extra (ทำเพิ่มเพื่อความโหด)

> งานหลักเสร็จ 100% แล้ว ต่อไปนี้คือ feature เพิ่มเติมที่จะทำให้โปรเจคโดดเด่น

### 1. Filter กรองชื่อ User
- เพิ่ม `<select id="userFilter">` dropdown เหนือตาราง — มี option ทุก username
- ใช้ `addEventListener('change', ...)` กรองแถวในตารางแบบ realtime
- ไม่ต้องเรียก server ใหม่ — filter ใน JS ได้เลย

### 2. Filter กรองประเภทไฟล์
- เพิ่ม `<select id="typeFilter">` — มี option: ทั้งหมด / รูปภาพ / PDF / อื่นๆ
- เช็ค extension ของชื่อไฟล์ เช่น `.jpg`, `.png` = รูป, `.pdf` = PDF
- filter ร่วมกับ userFilter ได้พร้อมกัน

### 3. Filter กรองชื่อไฟล์ (Search)
- เพิ่ม `<input type="text" id="searchInput">` — พิมพ์แล้วกรอง realtime
- ทำงานร่วมกับ filter อื่นได้

### 4. UI สวย
- เพิ่ม hover effect บนแถวตาราง
- แสดง badge สีต่างกันตาม role ของเจ้าของไฟล์
- ปุ่ม Download/ลบ ใส่ Tailwind class สีสัน

---

## งาน Logging — **ฉัน (เพื่อน) ทำ**

> งาน Backup + Recovery เพื่อน (เจ้าของโปรเจค) ทำ — รายละเอียดเต็มอยู่ใน USER-GUIDE.md

**สรุปสิ่งที่เพื่อน (เจ้าของโปรเจค) ทำฝั่ง Backup + Recovery:**

```
Backup:
- ใช้ TAR + Gzip บีบอัดโฟลเดอร์ uploads/ ทั้งก้อนเป็นไฟล์ .tar.gz
- ใช้ library: archiver (สร้าง backup), tar (แตก/กู้คืน)
- route: POST /backup (admin เท่านั้น)

Recovery (2 กรณี):
- กรณี A: กู้บางไฟล์ → แตกเฉพาะที่เลือก → แพ็ค backup ใหม่ (ไม่รวมไฟล์ที่กู้แล้ว)
- กรณี B: กู้ทั้งหมด → แตกทุกไฟล์ → ลบ .tar.gz ทิ้ง
- route: GET /backup/:filename/list (ดูรายการ), POST /restore (กู้คืน)
```

**เกี่ยวกับ Logging ยังไง?**
เพื่อนจะสร้าง route backup/restore แล้วเรียก `logActivity()` ในโค้ด — แต่ function `logActivity()` ต้องมีอยู่ก่อน ดังนั้น **ทำ Logging ก่อนได้เลย** เพื่อนจะมาเรียกใช้ทีหลัง

**วิธีที่เลือก: A + B รวมกัน**

- **A: เขียน `logActivity()` เอง** — log event สำคัญที่ต้องรู้ว่า "ใคร ทำอะไร"
- **B: ใช้ `morgan` library** — log HTTP traffic ภาพรวมอัตโนมัติ

**ทำไมต้องใช้ 2 ตัว?**
- `morgan` = บันทึกทุก HTTP request อัตโนมัติ (IP, URL, status code, เวลา) แต่ไม่รู้ว่า "ใคร" ทำ
- `logActivity()` = บันทึกว่า "user1 อัปโหลดไฟล์ report.pdf" — รู้ว่าใครทำอะไร
- ใช้คู่กัน → ได้ภาพรวม + รายละเอียด ครบทั้งสองแบบ

### ขั้นตอน

#### ขั้น 1: ติดตั้ง morgan
- [ ] `npm install morgan`

#### ขั้น 2: เพิ่ม morgan ใน server.js (2 บรรทัด)
```js
const morgan = require('morgan');
app.use(morgan('combined'));
```

**morgan คืออะไร?**
เหมือนกล้องวงจรปิดที่ถ่ายทุก request ที่เข้ามา — แค่ใส่ 2 บรรทัดนี้ มันจะ log ทุก request ให้อัตโนมัติ

`'combined'` = format มาตรฐาน บันทึก IP, วันที่, method, URL, status code, เวลาที่ใช้

วาง `app.use(morgan(...))` ไว้ **ก่อน route ทั้งหมด** เพื่อให้จับทุก request

#### ขั้น 3: สร้าง function `logActivity()`
```js
function logActivity(action, username, detail) {
    const entry = {
        timestamp: new Date().toISOString(),
        action,
        username,
        detail
    };
    fs.appendFileSync('logs.txt', JSON.stringify(entry) + '\n');
}
```

**อธิบายทีละตัว:**
- `new Date().toISOString()` → ได้เวลาปัจจุบันในรูปแบบ `"2026-02-24T21:30:00.000Z"`
- `action` → ชื่อ event เช่น `"LOGIN_SUCCESS"`, `"UPLOAD"`, `"DELETE"`
- `username` → ชื่อ user ที่ทำ action นี้
- `detail` → รายละเอียดเพิ่มเติม เช่น ชื่อไฟล์ที่อัปโหลด
- `JSON.stringify(entry)` → แปลง object เป็น string JSON
- `fs.appendFileSync()` → เขียนต่อท้ายไฟล์ (ไม่ทับของเดิม)
- `+ '\n'` → ขึ้นบรรทัดใหม่ เพื่อให้แต่ละ log อยู่คนละบรรทัด

**ผลลัพธ์ใน logs.txt:**
```
{"timestamp":"2026-02-24T21:30:00.000Z","action":"LOGIN_SUCCESS","username":"admin","detail":"admin"}
{"timestamp":"2026-02-24T21:31:00.000Z","action":"UPLOAD","username":"user1","detail":"report.pdf"}
```

วาง function นี้ไว้ **ก่อน route ทั้งหมด** เพื่อให้ทุก route เรียกใช้ได้

#### ขั้น 4: เรียก logActivity() ในแต่ละ route

ใส่ **1 บรรทัด** ในแต่ละ route ที่ต้องการ log:

| Route | วาง logActivity() ตรงไหน | โค้ด |
|-------|-------------------------|------|
| POST /login สำเร็จ | หลัง `jwt.sign()` | `logActivity('LOGIN_SUCCESS', username, role)` |
| POST /login ล้มเหลว | ใน `if (!user)` | `logActivity('LOGIN_FAILED', req.body.username, 'wrong credentials')` |
| POST /upload | หลัง upload สำเร็จ | `logActivity('UPLOAD', req.user.username, req.file.originalname)` |
| GET /download | ก่อน `res.download()` | `logActivity('DOWNLOAD', req.user.username, req.params.filename)` |
| DELETE /files (user) | หลังลบสำเร็จ | `logActivity('DELETE', req.user.username, req.params.filename)` |
| DELETE /files (admin) | หลังลบสำเร็จ | `logActivity('DELETE', req.user.username, filename + ' (owner: ' + owner + ')')` |
| Token ไม่ถูกต้อง | ใน authenticateToken | `logActivity('AUTH_FAILED', 'unknown', 'invalid token')` |
| **POST /backup** | **หลัง backup สำเร็จ** | **`logActivity('BACKUP', req.user.username, backupFile)`** |
| **POST /restore (บางไฟล์)** | **หลัง restore สำเร็จ** | **`logActivity('RESTORE', req.user.username, selectedFiles.join(', '))`** |
| **POST /restore (ทั้งหมด)** | **หลัง restore สำเร็จ** | **`logActivity('RESTORE_ALL', req.user.username, backupFile)`** |

> 3 อันล่างสุด (BACKUP, RESTORE, RESTORE_ALL) เป็น route ที่เพื่อน (เจ้าของโปรเจค) จะสร้าง — แค่ใส่ logActivity ให้ครบ

### ทริค

- **อย่าไป `console.log()` ทุก route ทีละอัน** — สร้าง function กลางที่เดียว เรียกใช้ทีละบรรทัด
- **เก็บเป็น JSON ต่อบรรทัด** (`.txt` หรือ `.jsonl`) — อ่านง่าย parse ง่าย grep ได้
- ถ้าอยากเก็บ logout ด้วย → ต้องสร้าง `POST /logout` route ใน server (ฝั่ง client แค่ลบ token มันไม่ผ่าน server)

### ลำดับที่ควรทำ (Logging)

| ลำดับ | งาน | ความยาก |
|-------|-----|---------|
| 1 | `npm install morgan` | ง่ายมาก |
| 2 | เพิ่ม `morgan` ใน server.js (2 บรรทัด) | ง่ายมาก |
| 3 | สร้าง `logActivity()` วางก่อน route ทั้งหมด | ง่าย |
| 4 | ใส่ `logActivity()` ในแต่ละ route (ดูตารางข้างบน) | ง่าย |
| 5 | เพิ่ม action BACKUP / RESTORE / RESTORE_ALL (รอเพื่อนสร้าง route ก่อน) | ง่าย |
