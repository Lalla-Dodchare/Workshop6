# งานฝั่ง Admin — สำหรับเพื่อน

> อ่าน TODO.md ด้วยนะ มีสรุปความรู้เกี่ยวกับ req ทั้งหมดไว้ให้

---

## คำสั่งสำหรับ Claude (ถ้าเพื่อนให้อ่านไฟล์นี้)

เพื่อนคนนี้รับผิดชอบ **ฝั่ง Admin เท่านั้น** — ทำงานในโฟลเดอร์ `page/admin/`

**วิธีสอน:**
- สอนทีละขั้น อย่าทำให้ทั้งหมด
- อธิบาย "ทำไม" ก่อน "ทำยังไง" เสมอ
- ให้เขียนเองก่อน แล้วส่งมาเช็ค
- ถ้าเขียนผิด อธิบายว่าผิดตรงไหน ทำไมถึงผิด แล้วให้แก้เอง
- ใช้ภาษาไทย

**ลำดับสอน:**
1. เริ่มจากวาง HTML layout ใน dashboard.html (hardcode ข้อมูลปลอมก่อน)
2. ใส่ Tailwind CSS ให้สวย
3. เตรียมโครง admin.js (comment โครงไว้ก่อน)
4. ถ้า backend พร้อมแล้วค่อยเชื่อม fetch จริง

**ห้ามทำ:**
- อย่าแก้ไฟล์นอก `page/admin/` เด็ดขาด
- อย่าเขียนโค้ดให้ทั้งหมด ต้องสอนให้เขียนเอง

---

## สถานะตอนนี้

- ระบบ login ใช้ได้แล้ว (server.js + script.js)
- login admin/admin123 → redirect ไป `/page/admin/dashboard.html`
- login user1/user123 → redirect ไป `/page/user/home.html`
- หน้า dashboard.html ตอนนี้เป็นแค่หน้าเปล่า มีปุ่ม Logout

## ห้ามแตะ (เพื่อนทำอยู่)

- `server.js` — อย่าแก้ เพื่อนทำฝั่ง backend อยู่
- `script.js` (ที่ root) — เป็น script หน้า login
- `page/user/` — ฝั่ง user เพื่อนทำ
- `index.html` — หน้า login

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

### 3. Tailwind CSS ให้สวย

ใช้ Tailwind class ทำให้หน้า dashboard ดูดี:
- Tailwind CDN มีอยู่แล้วใน `<head>` ของ dashboard.html
- ดู reference ได้ที่ https://tailwindcss.com/docs
- ดูหน้า login (index.html) เป็นตัวอย่างสไตล์

---

## วิธีทดสอบ

1. เปิด terminal → `node server.js`
2. เปิด browser → `http://localhost:5000`
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

## สิ่งที่ยังรอ backend (ยังทำไม่ได้)

- fetch GET /files แบบที่ต้องแนบ token — backend ยังไม่มี middleware ตรวจ token
- DELETE /files/:filename — backend ยังไม่มี route นี้
- แสดงชื่อเจ้าของไฟล์ — backend ยังไม่แยกโฟลเดอร์ตาม user

**สรุป: ตอนนี้ทำ HTML + Tailwind + เตรียมโครง script ไว้ก่อนได้เลย!**

---

## ถ้าติดอะไร

ถาม Claude ได้เลย — บอกว่า "ทำฝั่ง admin อยู่" จะได้ช่วยถูกจุด
อ่าน TODO.md หัวข้อ "สรุป req" ด้วย มีอธิบาย req.body, req.params, req.headers ละเอียด
