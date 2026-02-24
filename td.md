# TODO — Logging (เพื่อนทำ)

> ไฟล์นี้สำหรับเพื่อน — งาน Backup + Recovery อยู่ใน USER-GUIDE.md แล้ว

---

## แบ่งงาน — ใครทำอะไร

```
┌──────────────────────────────────┬──────────────────────────────────┐
│         ฉัน (เจ้าของโปรเจค)       │         เพื่อน                    │
├──────────────────────────────────┼──────────────────────────────────┤
│  ✅ Backup (TAR + Gzip)          │  ✅ Logging (logActivity + morgan)│
│  ✅ Recovery (กู้คืนจาก backup)   │                                  │
│  → ดูรายละเอียดใน USER-GUIDE.md  │  → ดูรายละเอียดด้านล่าง          │
└──────────────────────────────────┴──────────────────────────────────┘
```

---

## Logging (เก็บ log ทุกอย่าง) — **เพื่อนทำ**

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
  | **POST /backup** | **`BACKUP`** | **ชื่อไฟล์ backup** |
  | **POST /restore (บางไฟล์)** | **`RESTORE`** | **รายชื่อไฟล์ที่กู้** |
  | **POST /restore (ทั้งหมด)** | **`RESTORE_ALL`** | **ชื่อ backup ที่ลบทิ้ง** |

> 3 อันล่างสุด (BACKUP, RESTORE, RESTORE_ALL) เป็น route ที่ฉันจะสร้าง — เพื่อนแค่ใส่ logActivity ให้ครบ

### ทริค

- **อย่าไป `console.log()` ทุก route ทีละอัน** — สร้าง function กลางที่เดียว เรียกใช้ทีละบรรทัด
- **morgan จัดการ HTTP log ให้อัตโนมัติ** — ไม่ต้องเขียนเอง แต่มันไม่รู้ว่า "ใคร" ทำ เลยต้องใช้คู่กับ logActivity
- **เก็บเป็น JSON ต่อบรรทัด** (`.txt` หรือ `.jsonl`) — อ่านง่าย parse ง่าย grep ได้
- ถ้าอยากเก็บ logout ด้วย → ต้องสร้าง `POST /logout` route ใน server (ฝั่ง client แค่ลบ token มันไม่ผ่าน server)

---

## ลำดับที่ควรทำ (Logging)

| ลำดับ | งาน | ความยาก |
|-------|-----|---------|
| 1 | `npm install morgan` | ง่ายมาก |
| 2 | เพิ่ม `morgan` ใน server.js (2 บรรทัด) | ง่ายมาก |
| 3 | สร้าง `logActivity()` + ใส่ทุก route | ง่าย |
| 4 | เพิ่ม action BACKUP / RESTORE / RESTORE_ALL ในตาราง log | ง่าย |
