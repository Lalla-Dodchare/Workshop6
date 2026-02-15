const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 5000;
const jwt = require('jsonwebtoken');
const SECRET_KEY ='workshop6-secret-key'

app.use(cors());
app.use(express.json()); // ให้อ่าน JSON body ได้ (สำหรับ login)

// serve ไฟล์ HTML ทั้งหมดจาก root (index.html, page/ folder)
app.use(express.static(__dirname));

// ข้อมูล user (เก็บง่ายๆ ใน array — ไม่ต้องใช้ database)
const users = [
    { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
    { id: 2, username: 'user1', password: 'user123', role: 'user' },
    { id: 3, username: 'user2', password: 'user123', role: 'user' },
];

// ===== API Login =====
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // หา user ที่ตรงกับ username + password
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({ error: 'username หรือ password ไม่ถูกต้อง' });
    }

    // ส่งข้อมูล user กลับ (ไม่ส่ง password กลับไป)
    res.json({
        message: 'Login สำเร็จ',
        user: { id: user.id, username: user.username, role: user.role }
    });
});

// ===== ตั้งค่าที่เก็บไฟล์อัปโหลด =====
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

// อัปโหลดไฟล์จาก Client -> Server
app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ message: 'File uploaded successfully', filename: req.file.filename });
});

// แสดงรายการไฟล์ที่มีในเซิร์ฟเวอร์
app.get('/files', (req, res) => {
    fs.readdir('uploads', (err, files) => {
        if (err) return res.status(500).json({ error: 'Unable to list files' });
        res.json(files);
    });
});

// ให้ Client ดาวน์โหลดไฟล์จาก Server
app.get('/download/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.params.filename);
    res.download(filePath);
});

// เริ่มเซิร์ฟเวอร์
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}  ไอสาส`);
});
