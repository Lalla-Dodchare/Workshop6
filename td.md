# TODO — Backup, Recovery, Logging

---

## 1. Logging (เก็บ log ทุกอย่าง)

**วิธีที่เลือก: A + B รวมกัน**

- **A: เขียน `logActivity()` เอง** — log event สำคัญที่ต้องรู้ว่า "ใคร ทำอะไร"
- **B: ใช้ `morgan` library** — log HTTP traffic ภาพรวมอัตโนมัติ

### ขั้นตอน

- [ ] `npm install morgan`
- [ ] เพิ่ม `morgan` ใน server.js (2 บรรทัด)
  ```js
  const morgan = require('morgan');
  app.use(morgan('combined'));
  ```
- [ ] สร้าง function `logActivity(action, username, detail)`
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
- [ ] เรียก `logActivity()` ในแต่ละ route:

  | Route | action ที่ log | detail |
  |-------|---------------|--------|
  | POST /login สำเร็จ | `LOGIN_SUCCESS` | role |
  | POST /login ล้มเหลว | `LOGIN_FAILED` | username ที่พยายาม |
  | POST /upload | `UPLOAD` | ชื่อไฟล์ |
  | GET /download | `DOWNLOAD` | ชื่อไฟล์ |
  | DELETE /files (user) | `DELETE` | ชื่อไฟล์ |
  | DELETE /files (admin) | `DELETE` | ชื่อไฟล์ + owner |
  | Token ไม่ถูกต้อง | `AUTH_FAILED` | - |
  | Logout (ฝั่ง client) | `LOGOUT` | ถ้าอยากเก็บต้องสร้าง route /logout |

### ทริค

- **อย่าไป `console.log()` ทุก route ทีละอัน** — สร้าง function กลางที่เดียว เรียกใช้ทีละบรรทัด
- **morgan จัดการ HTTP log ให้อัตโนมัติ** — ไม่ต้องเขียนเอง แต่มันไม่รู้ว่า "ใคร" ทำ เลยต้องใช้คู่กับ logActivity
- **เก็บเป็น JSON ต่อบรรทัด** (`.txt` หรือ `.jsonl`) — อ่านง่าย parse ง่าย grep ได้
- ถ้าอยากเก็บ logout ด้วย → ต้องสร้าง `POST /logout` route ใน server (ฝั่ง client แค่ลบ token มันไม่ผ่าน server)

---

## 2. Backup

### ขั้นตอน

- [ ] สร้างโฟลเดอร์ `backups/`
- [ ] เขียน function `copyFolderSync(src, dest)` สำหรับ copy โฟลเดอร์ทั้งก้อน
- [ ] สร้าง route `POST /backup` (admin เท่านั้น)
  ```js
  app.post('/backup', authenticateToken, (req, res) => {
      if (req.user.role !== 'admin') return res.status(403).json({ error: 'ไม่มีสิทธิ์' });
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupDir = path.join(__dirname, 'backups', timestamp);
      copyFolderSync(path.join(__dirname, 'uploads'), backupDir);
      logActivity('BACKUP', req.user.username, backupDir);
      res.json({ message: 'Backup สำเร็จ', path: backupDir });
  });
  ```
- [ ] เพิ่มปุ่ม Backup ในหน้า admin dashboard

### ทริค

- **ตั้งชื่อ backup ด้วย timestamp** — เช่น `backups/2026-02-24T10-30-00/` จะได้ไม่ทับกัน
- **backup ก่อนทำอะไรอันตราย** — เช่น ก่อนลบไฟล์จำนวนมาก

---

## 3. Recovery (กู้คืน) — ระบบ Trash

**แนวคิด: ลบ = ย้ายไป trash (ไม่ได้ลบจริง)**

### ขั้นตอน

- [ ] สร้างโฟลเดอร์ `trash/`
- [ ] แก้ DELETE route ทั้ง 2 อัน — เปลี่ยนจาก `fs.unlinkSync()` เป็น `fs.renameSync()` ย้ายไป trash
  ```js
  // แทน fs.unlinkSync(fileDelete)
  const trashPath = path.join(__dirname, 'trash', owner, filename);
  fs.mkdirSync(path.dirname(trashPath), { recursive: true });
  fs.renameSync(fileDelete, trashPath);
  ```
- [ ] สร้าง route `GET /trash` — admin ดูรายการไฟล์ในถังขยะ
- [ ] สร้าง route `POST /restore/:owner/:filename` — กู้ไฟล์คืนจาก trash กลับ uploads
  ```js
  app.post('/restore/:owner/:filename', authenticateToken, (req, res) => {
      const trashFile = path.join(__dirname, 'trash', req.params.owner, req.params.filename);
      const restoreTo = path.join(__dirname, 'uploads', req.params.owner, req.params.filename);
      fs.renameSync(trashFile, restoreTo);
      logActivity('RESTORE', req.user.username, req.params.filename);
      res.json({ message: 'กู้คืนสำเร็จ' });
  });
  ```
- [ ] เพิ่มหน้า/ส่วน Trash ใน admin dashboard — แสดงไฟล์ที่ถูกลบ + ปุ่มกู้คืน

### ทริค

- **ย้ายแทนลบ = ปลอดภัยกว่ามาก** — ลบผิดก็เอาคืนได้
- **เก็บ path เดิมไว้** (owner/filename) — ตอน restore จะได้กลับที่เดิมถูก
- ถ้าอยากเพิ่ม: ลบอัตโนมัติจาก trash หลัง 30 วัน (แต่ยังไม่ต้องทำตอนนี้)

---

## ลำดับที่ควรทำ

| ลำดับ | งาน | ความยาก |
|-------|-----|---------|
| 1 | สร้าง `logActivity()` + ใส่ทุก route | ง่าย |
| 2 | `npm install morgan` + เพิ่ม 2 บรรทัด | ง่ายมาก |
| 3 | แก้ Delete เป็นระบบ trash (ย้ายแทนลบ) | กลาง |
| 4 | สร้าง route GET /trash + POST /restore | กลาง |
| 5 | สร้าง route POST /backup | กลาง-ยาก |
| 6 | เพิ่ม UI ปุ่ม backup + หน้า trash ใน dashboard | กลาง |
