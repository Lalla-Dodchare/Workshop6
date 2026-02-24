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

### 1. middleware ตรวจ token (server.js) — Claude อธิบายแล้ว + ตัวอย่างข้างล่าง

ทุก route หลัง login ต้องเช็คว่า client ส่ง token มาด้วยหรือเปล่า

```
client ส่ง request มา
  → header: { Authorization: 'Bearer eyJhbG...' }
  → middleware ดึง token ออกมา
  → jwt.verify(token, SECRET_KEY) → ถ้าถูก → req.user = decoded → next()
  → ถ้าผิด → res.status(401)
```

**middleware คืออะไร?**
เหมือน "ยามหน้าประตู" — ทุก request ต้องผ่านยามก่อนถึงจะไปถึง route จริง
function middleware รับ 3 ตัว: `(req, res, next)`
- `req` = ข้อมูลที่ client ส่งมา
- `res` = ใช้ส่งคำตอบกลับ
- `next()` = บอกว่า "ผ่านแล้ว ไปทำ route ต่อเลย"

**JWT มี 3 ส่วน** (คั่นด้วยจุด `.`):
```
eyJhbGciOiJI.eyJpZCI6MSwidXNl.SflKxwRJSMeKKF2
|-- Header --|-- Payload -------|-- Signature --|
```
- Header = บอก algorithm ที่ใช้เข้ารหัส
- Payload = ข้อมูลที่ฝังไว้ (id, username, role)
- Signature = ลายเซ็น สร้างจาก SECRET_KEY — เอาไว้เช็คว่าถูกแก้มั้ย

client ส่ง token ทั้งก้อน (3 ส่วนรวมกัน) มาใน header → server ใช้ `jwt.verify()` แกะให้อัตโนมัติ

**SECRET_KEY คืออะไร?**
รหัสลับที่มีแค่ server รู้ เหมือนตราประทับบริษัท:
- ตอน login → ใช้ `jwt.sign()` ประทับตราลงบนบัตร (สร้าง token)
- ตอนเช็ค → ใช้ `jwt.verify()` ดูว่าตราตรงมั้ย (เช็ค token)
- ถ้าไม่มี SECRET_KEY → ใครก็ปลอม token ได้

**ตัวอย่างโค้ด authenticateToken:**
```js
function authenticateToken(req, res, next) {
    // ขั้น 1: ดึง header Authorization → ได้ "Bearer eyJhbG..."
    const authHeader = req.headers['authorization'];
    // แยกเอาเฉพาะ token (ส่วนหลัง "Bearer ")
    const token = authHeader && authHeader.split(' ')[1];

    // ขั้น 2: ถ้าไม่มี token เลย → ไล่กลับ 401
    if (!token) return res.status(401).json({ error: 'ไม่มี token' });

    // ขั้น 3: เช็คว่า token ถูกมั้ย
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(403).json({ error: 'token ไม่ถูกต้อง' });
        // decoded = ข้อมูลที่ฝังไว้ตอน login { id, username, role }
        req.user = decoded;  // เก็บไว้ให้ route ข้างหลังใช้ต่อ
        next();              // ผ่านแล้ว ไปต่อ
    });
}
```

**หมายเหตุ:**
- อย่าใส่ `const jwt = jwt.verify(...)` → jwt เป็นชื่อ library ที่ require มาแล้ว ถ้าประกาศใหม่จะทับตัวเดิม!
- วาง function นี้ไว้หลัง login route (บรรทัด 45) แต่ก่อน route upload/files/download

สร้าง function `authenticateToken` แล้วใส่ก่อน route ที่ต้องการป้องกัน:
```js
// ใส่ไว้หลัง login route, ก่อน upload/files/download/delete route
app.post('/upload', authenticateToken, upload.single('file'), ...)
app.get('/files', authenticateToken, ...)
```

### 2. แก้ upload — แยกโฟลเดอร์ตาม user (server.js) — Claude อธิบายแล้ว

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

**วิธีทำ:** เปลี่ยน multer destination จาก string ตายตัว → เป็น function

**ตัวอย่างโค้ด:**
```js
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const userFolder = path.join('uploads', req.user.username);
        fs.mkdirSync(userFolder, { recursive: true });
        cb(null, userFolder);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
```

**อธิบายทีละตัว:**

`destination: (req, file, cb) => { ... }`
- `req` = request — ข้อมูลที่ client ส่งมา (รวมถึง req.user ที่ได้จาก token)
- `file` = ไฟล์ที่กำลังอัปโหลด (มี file.originalname, file.size ฯลฯ)
- `cb` = callback — function ที่ใช้บอก multer ว่าเก็บไฟล์ไว้ที่ไหน เรียกแบบ `cb(error, ค่า)`

`path.join('uploads', req.user.username)`
- `path` = library ของ Node.js สำหรับจัดการเส้นทางไฟล์
- `.join()` = เอาหลายส่วนมาต่อกันเป็น path ที่ถูกต้อง
- ผลลัพธ์: `uploads/user1`

`fs.mkdirSync(userFolder, { recursive: true })`
- `fs` = library ของ Node.js สำหรับจัดการไฟล์/โฟลเดอร์
- `.mkdirSync()` = สร้างโฟลเดอร์ (mkdir = make directory, Sync = รอจนเสร็จ)
- `{ recursive: true }` = ถ้า parent folder ยังไม่มี → สร้างให้ด้วย

`cb(null, userFolder)`
- ตัวแรก `null` = ไม่มี error
- ตัวที่สอง = บอก multer ว่าเก็บไฟล์ไว้ที่โฟลเดอร์นี้

**สำคัญ:** ต้องใส่ `authenticateToken` ใน route ด้วย ไม่งั้น req.user จะ undefined!
```js
app.post('/upload', authenticateToken, upload.single('file'), ...)
app.get('/files', authenticateToken, ...)
app.get('/download/:filename', authenticateToken, ...)
```

route `/files` กับ `/download` ก็ต้องแก้ path ให้ชี้ไปโฟลเดอร์ของ user:
```js
// /files → อ่านเฉพาะโฟลเดอร์ของ user คนนั้น
fs.readdir(path.join('uploads', req.user.username), ...)

// /download → ดาวน์โหลดจากโฟลเดอร์ของ user
path.join(__dirname, 'uploads', req.user.username, req.params.filename)
```

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

---

## งาน Extra (ทำเพิ่มเพื่อความโหด)

> งานหลักเสร็จ 100% แล้ว ต่อไปนี้คือ feature เพิ่มเติมที่จะทำให้โปรเจคโดดเด่น

### 1. ระบบสมัครสมาชิก (Register)
- เพิ่มหน้า register.html หรือเพิ่ม form ใน index.html
- เพิ่ม `POST /register` ใน server.js — รับ username/password แล้ว push เข้า users array
- เช็ค username ซ้ำก่อน push

### 2. Preview ไฟล์แบบดีๆ
- รูปภาพ → แสดงใน `<img>` (ทำแล้ว แต่ทำให้สวยขึ้น — เพิ่ม modal popup)
- PDF → แสดงใน `<iframe>` หรือ `<embed>`
- ไฟล์อื่น → แสดงไอคอน + ชื่อไฟล์ + ขนาดไฟล์

### 3. แชร์ไฟล์ให้คนอื่นได้ (Share)
- เพิ่มปุ่ม Share ในตารางไฟล์
- เพิ่ม `POST /share` ใน server.js — รับ filename + username ที่จะแชร์ให้
- เก็บข้อมูลว่าใครแชร์ให้ใคร (เพิ่ม field `sharedBy` ใน response)
- แสดงในตารางว่า "แชร์โดย username"

### 4. Filter ชื่อไฟล์
- เพิ่ม `<input type="text" id="searchInput">` เหนือตาราง
- ใช้ `addEventListener('input', ...)` กรองแถวในตารางแบบ realtime
- ไม่ต้องเรียก server ใหม่ — filter ใน JS ได้เลย

### 5. UI สวย
- เพิ่ม hover effect บนแถวตาราง
- ปุ่ม Download/ลบ ใส่ Tailwind class สีสัน
- แสดงขนาดไฟล์ในตาราง (ต้องให้ server.js ส่ง size มาด้วย)

### 6. Backup (TAR + Gzip) — ฉันทำ

**วิธีที่เลือก: TAR + Gzip (`.tar.gz`)**

**เหตุผลที่เลือก:**
- TAR รวมทั้งโฟลเดอร์เป็นก้อนเดียวแล้วค่อยบีบ → เห็น pattern ข้ามไฟล์ได้ → ผลลัพธ์เล็กกว่าบีบทีละไฟล์
- Recovery ง่าย — แตกไฟล์เดียว ได้โครงสร้างโฟลเดอร์คืนมาทั้งหมด
- เป็นมาตรฐานอุตสาหกรรม เปิดได้ทุก OS
- ไม่ต้อง install native binding ที่อาจพังบน Windows

**ใช้ library:** `archiver` (npm) สำหรับสร้าง backup, `tar` (npm) สำหรับแตก/กู้คืน

#### ขั้นตอน

- [ ] `npm install archiver tar`
- [ ] สร้างโฟลเดอร์ `backups/`
- [ ] สร้าง route `POST /backup` (admin เท่านั้น)
  ```js
  const archiver = require('archiver');

  app.post('/backup', authenticateToken, (req, res) => {
      if (req.user.role !== 'admin') return res.status(403).json({ error: 'ไม่มีสิทธิ์' });
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupFile = path.join(__dirname, 'backups', `${timestamp}.tar.gz`);

      const output = fs.createWriteStream(backupFile);
      const archive = archiver('tar', { gzip: true, zlib: { level: 9 } });

      output.on('close', () => {
          logActivity('BACKUP', req.user.username, backupFile);
          res.json({ message: 'Backup สำเร็จ', file: backupFile, size: archive.pointer() });
      });

      archive.pipe(output);
      archive.directory('./uploads', false);
      archive.finalize();
  });
  ```
- [ ] เพิ่มปุ่ม Backup ในหน้า admin dashboard

#### ทริค

- **ตั้งชื่อ backup ด้วย timestamp** — เช่น `2026-02-24T10-30-00.tar.gz` จะได้ไม่ทับกัน
- **backup ก่อนทำอะไรอันตราย** — เช่น ก่อนลบไฟล์จำนวนมาก
- **ประหยัดพื้นที่ ~60-65%** เมื่อเทียบกับ copy โฟลเดอร์ธรรมดา

---

### 7. Recovery (กู้คืนจาก Backup) — ฉันทำ

**แนวคิด: แบ่งเป็น 2 กรณี**

```
กรณี A: กู้บางไฟล์ (1 ไฟล์ขึ้นไป แต่ไม่ครบทั้งหมด)
    → แตกเฉพาะไฟล์ที่เลือก → ส่งกลับไป uploads/
    → แพ็ค .tar.gz ใหม่ โดยไม่รวมไฟล์ที่กู้แล้ว

กรณี B: กู้ทั้งหมด (เลือกครบทุกไฟล์)
    → แตกทุกไฟล์ออกมา → ส่งกลับไป uploads/
    → ลบ .tar.gz ทิ้งเลย (ไม่ต้องแพ็คใหม่)
```

**วิธีแยกกรณี:** นับจำนวนไฟล์ที่เลือก vs ไฟล์ทั้งหมดใน backup
```js
if (selectedFiles.length === totalFilesInBackup) {
    // กรณี B — แตกหมด แล้วลบ .tar.gz ทิ้ง
} else {
    // กรณี A — แตกเฉพาะที่เลือก แล้วแพ็คใหม่
}
```

#### ขั้นตอน

- [ ] สร้าง route `GET /backup/:filename/list` — ดูรายการไฟล์ใน backup (ไม่ต้องแตก)
  ```js
  const tar = require('tar');

  // ใช้ tar.t() เปิดดูว่ามีไฟล์อะไรบ้าง
  app.get('/backup/:filename/list', authenticateToken, (req, res) => {
      const files = [];
      tar.t({
          file: path.join(__dirname, 'backups', req.params.filename),
          onReadEntry: entry => files.push({ path: entry.path, size: entry.size })
      }).then(() => res.json(files));
  });
  ```
- [ ] สร้าง route `POST /restore` — กู้คืนไฟล์ที่เลือก
  ```js
  app.post('/restore', authenticateToken, async (req, res) => {
      const { backupFile, selectedFiles, totalFiles } = req.body;

      // แตกเฉพาะไฟล์ที่เลือก กลับไป uploads/
      await tar.x({
          file: path.join(__dirname, 'backups', backupFile),
          cwd: path.join(__dirname, 'uploads')
      }, selectedFiles);

      if (selectedFiles.length === totalFiles) {
          // กรณี B — กู้ทั้งหมด → ลบ backup ทิ้ง
          fs.unlinkSync(path.join(__dirname, 'backups', backupFile));
      } else {
          // กรณี A — กู้บางไฟล์ → แพ็ค backup ใหม่ (ไม่รวมไฟล์ที่กู้แล้ว)
          // แตกทั้งหมดไป temp → ลบไฟล์ที่กู้แล้ว → แพ็คใหม่ → ลบ temp
      }

      logActivity('RESTORE', req.user.username, selectedFiles.join(', '));
      res.json({ message: 'กู้คืนสำเร็จ', restored: selectedFiles.length });
  });
  ```
- [ ] เพิ่ม UI ส่วนกู้คืน ในหน้า admin dashboard — แสดงรายการ backup + เลือกไฟล์กู้คืน

#### ทริค

- **ดูก่อนแตก** — ใช้ `tar.t()` list ไฟล์ใน backup ให้ user เลือกก่อน ไม่ต้องแตกทั้งก้อน
- **กู้บางไฟล์ → แพ็คใหม่** — เอาไฟล์ที่เหลือแพ็คกลับเป็น .tar.gz ใหม่
- **กู้ทั้งหมด → ลบ backup ทิ้ง** — ไม่ต้องเสียพื้นที่เก็บ backup ที่ว่างเปล่า

#### ลำดับที่ควรทำ (Backup + Recovery)

| ลำดับ | งาน | ความยาก |
|-------|-----|---------|
| 1 | `npm install archiver tar` | ง่ายมาก |
| 2 | สร้างโฟลเดอร์ `backups/` | ง่ายมาก |
| 3 | สร้าง route `POST /backup` (TAR + Gzip) | กลาง |
| 4 | สร้าง route `GET /backup/:filename/list` | กลาง |
| 5 | สร้าง route `POST /restore` (2 กรณี) | กลาง-ยาก |
| 6 | เพิ่ม UI ปุ่ม backup + หน้ากู้คืน ใน dashboard | กลาง |
