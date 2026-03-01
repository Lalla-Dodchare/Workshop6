const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;
const jwt = require('jsonwebtoken');
const morgan = require('morgan');
// const { json } = require('stream/consumers');
const archiver = require('archiver');
const  tar = require('tar');
const sizeOf = require('image-size');
const SECRET_KEY ='workshop6-secret-ke'

app.use(cors());
app.use(express.json()); // ให้อ่าน JSON body ได้ (สำหรับ login)
app.use(morgan('combined'));


// serve ไฟล์ HTML ทั้งหมดจาก root (index.html, page/ folder)
app.use(express.static(__dirname));

// ข้อมูล user (เก็บง่ายๆ ใน array — ไม่ต้องใช้ database)
// const users = [
//     { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
//     { id: 2, username: 'Peerapan Uaichai', password: 'user123', role: 'user' },
//     { id: 3, username: 'Lalla Dodchare', password: 'user123', role: 'user' },
// ];
// ข้อมูล user เก็บใน Json
let users = JSON.parse(fs.readFileSync('user.json', 'utf8'));
function saveUsers() {
    fs.writeFileSync('user.json', JSON.stringify(users, null, 4));
}

// function logActivity() บันทึกว่า "ใคร ทำอะไร เมื่อไหร่" ลงไฟล์ logs.txt
function logActivity(action, username, detail) {
    const entry = {
        timestamp : new Date().toISOString(),
        action, username, detail
    };
    fs.appendFileSync('logs.txt', JSON.stringify(entry) + '\n');
}


// ===== API Login (ชั่วคราว — ยังไม่มี middleware ตรวจ token, ยังไม่แยกโฟลเดอร์ตาม user) =====
app.post('/login', (req, res) => {
    // step 1: ดึง username, password จาก body ที่ client ส่งมา
    const { username, password } = req.body;

    // step 2: หาใน array users ว่ามี user ที่ตรงกับ username + password มั้ย
    const user = users.find(u => u.username === username && u.password === password);

    // step 3: ถ้าไม่เจอ → ส่ง error กลับ
    if (!user) {
        logActivity('LOGIN_FAILED', 'unknow', 'wrong credentials');
        return res.status(401).json({ error: 'username หรือ password ไม่ถูกต้อง' });
    }

    // step 4: ถ้าเจอ → สร้าง token ฝัง id, username, role ลงไป
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, SECRET_KEY);
    logActivity('LOGIN_SUCCESS', user.id + ':' + user.username, user.role);
    // step 5: ส่ง token + ข้อมูล user กลับไปให้ client (ไม่ส่ง password กลับ)
    res.json({
        token, user: { id: user.id, username: user.username, role: user.role }
    });
});

    app.post('/register', (req, res) => {
        const { username, password} = req.body;
        const user = users.find(u => u.username === username);

        if (user) {
            return res.status(400).json({ error: 'username นี้มีคนใช้แล้ว'})
        }
        const newUser = { id: users.length + 1, username, password, role: 'user'};
        users.push(newUser);
        saveUsers();
        res.json({ message: 'สมัครสมาชิกสำเร็จ'});
    })


function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]

    if(!token) {
        logActivity('AUTH_FAILED', 'unknow', 'No token');
        return res.status(401).json({ error: 'ไม่มี token'});
    }

    

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            logActivity('TOKEN_ERROR', 'unknow', 'Invalid token')
            return res.status(403).json({ error: 'token ไม่ถูกต้อง'});
        }
        req.user = decoded;
        next();
    });
}



// ===== ตั้งค่าที่เก็บไฟล์อัปโหลด =====
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        const userFolder = path.join('uploads', String(req.user.id));
        fs.mkdirSync(userFolder, {recursive: true});
        cb(null,userFolder);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

// อัปโหลดไฟล์จาก Client -> Server
app.post('/upload', authenticateToken ,upload.single('file'), (req, res) => {
    const userFolder = path.join('uploads', String(req.user.id))
    const MAX_SIZE = 50 * 1024 * 1024
    const currentSize = getFolderSize(userFolder);

    if (currentSize > MAX_SIZE) {
        return res.status(400).json({ error: 'พื้นที่เต็ม ไม่สามารถอัปโหลดได้ (จำกัด 50 MB)' })
    }
    logActivity('UPLOAD_SUCCESS', req.user.id + ':' + req.user.username, req.file.originalname);
    res.json({ message: 'File uploaded successfully', filename: req.file.filename });
});

/// คำนวณขนาดโฟลเดอร์
    function getFolderSize(folderPath) {
         if (!fs.existsSync(folderPath)) {
            return 0;
         } const readFile = fs.readdirSync(folderPath);
         let totalSize = 0 ;
         readFile.forEach(function(filename) { 
            const filePath = path.join(folderPath, filename);
            const size = fs.statSync(filePath).size;
            totalSize += size;
         });
         return totalSize;
    }






// แสดงรายการไฟล์ที่มีในเซิร์ฟเวอร์
// app.get('/files', authenticateToken, (req, res) => {
//     fs.readdir(path.join('uploads', req.user.username), (err, files) => {
//         if (req.user.role === 'admin') {
//             fs.readdir('uploads/req.user.username')
//             res.json({ filename: "report.pdf", owner: "user1" })
//         } else {
//             fs.readdir(path.join('uploads', req.user.username));
//         }
//         res.json(files);
//     })
// });

// Backup
app.post('/backup', authenticateToken, (req, res) => {
    let backupSource;
    if (req.user.role === 'admin' || req.user.role === 'superadmin'){
        backupSource = path.join(__dirname, 'uploads');
    } else {
        backupSource = path.join(__dirname, 'uploads', String(req.user.id));
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFile = path.join(__dirname, 'backups', `${timestamp}.tar.gz`);
    fs.mkdirSync(path.join(__dirname, 'backups'), { recursive: true});

    const output = fs.createWriteStream(backupFile);
    const archive = archiver('tar', { gzip: true});

    output.on('close', () => {
        logActivity('BACKUP', req.user.id + ':' + req.user.username, backupFile);
        res.json({ message: 'Backup สำเร็จ', file: backupFile, size: archive.pointer()});
    });

    archive.pipe(output);
    archive.directory(backupSource, false);
    archive.finalize();
    
})

// Recovery 
app.get('/backup/:filename/list', authenticateToken, (req, res) => {
    const backupPath =path.join(__dirname, 'backups', req.params.filename );
    
    const files = [];
    tar.t({
        file: backupPath,
        onReadEntry: entry => {
            files.push({ path: entry.path, size: entry.size});
        }
    }).then(() =>{
        res.json(files);
    })
})

app.post('/backup/:filename/recover', authenticateToken, async (req, res) => {
    const {selectedFiles} = req.body;
    const backupPath = path.join(__dirname, 'backups', req.params.filename);

    await tar.x({
        file: backupPath,
        cwd: path.join(__dirname, 'uploads'),
    }, selectedFiles)
    logActivity('RESTORE', req.user.id + ':' + req.user.username, selectedFiles.join(','));
    res.json({ message: 'Recovery สำเร็จ', restored: selectedFiles.length});
})




// แสดงรายการไฟล์ที่มีในเซิร์ฟเวอร์
app.get('/files', authenticateToken, (req, res) => {
    if (req.user.role === 'admin' || req.user.role === 'superadmin') {
        const uploadsDir = path.join(__dirname, 'uploads');
        fs.readdir(uploadsDir, (err, folders) => {
            if (err) return res.status(500).json({ error: 'Unable to list files' });
            const allFiles = [];
            folders.forEach(folder => {
                const folderPath = path.join(uploadsDir, folder);
                if (fs.statSync(folderPath).isDirectory()) {
                    const files = fs.readdirSync(folderPath);
                    files.forEach(file => {
                        const user = users.find(u => u.id === Number(folder));
                        const role = user ? user.role : 'user';
                        allFiles.push({ filename: file, owner: folder, role: role, username: user ? user.username : folder });
                    });
                }
            });
            res.json(allFiles);
        });
        


    } else {
        fs.readdir(path.join('uploads', String(req.user.id)), (err, files) => {
            if (err) return res.status(500).json({ error: 'Unable to list files' });
            const result = [];
            files.forEach(function(filename){
                const filePath = path.join('uploads', String(req.user.id), filename);
                const stat = fs.statSync(filePath);
                const ext = path.extname(filename).toLowerCase();
                let dimensions = null;
                try {
                    dimensions = sizeOf(filePath);
                } catch (e) {
                }

                result.push({
                    filename: filename,
                    size: stat.size,
                    type: ext,
                    birthtime: stat.birthtime,
                    modified: stat.mtime,
                    dimensions: dimensions
                });
            })
            
            res.json(result);
        });
    }
});




// Download สำหรับ admin 
app.get('/download/:owner/:filename', authenticateToken, (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.params.owner, req.params.filename);
    logActivity('DOWNLOAD', req.user.id + ':' + req.user.username, req.params.filename);
    res.download(filePath);
});




// ให้ Client ดาวน์โหลดไฟล์จาก Server
app.get('/download/:filename', authenticateToken, (req, res) => {
    const filePath = path.join(__dirname, 'uploads', String(req.user.id), req.params.filename);
    logActivity('DOWNLOAD', req.user.id + ':' + req.user.username, req.params.filename);
    res.download(filePath);
});


// Delete สำหรับ  userz
app.delete('/files/:filename', authenticateToken, (req, res) => {
    const fileDelete = path.join(__dirname, 'uploads', String(req.user.id), req.params.filename);
    fs.unlinkSync(fileDelete);
    logActivity('DELETE', req.user.id + ':' + req.user.username, req.params.filename);
    res.json({ message: 'ลบสำเร็จ' });
});



// Delete สำหรับ admin
app.delete('/files/:owner/:filename', authenticateToken, (req, res) => {
    const fileDelete = path.join(__dirname, 'uploads', req.params.owner, req.params.filename);
    fs.unlinkSync(fileDelete);
    logActivity('DELETE', req.user.id + ':' + req.user.username, req.params.filename);
    res.json({ message: 'ลบสำเร็จ'});
})


/// function แชร์ไฟล์
app.post('/share', authenticateToken, (req, res) => {
    if (req.user.role !== 'admin' && req.user.role !== 'superadmin') 
        return ;
   const {filename, targetUsers} = req.body;
   const filefrom = path.join('uploads', String(req.user.id), filename);

    targetUsers.forEach(function(userId) {
        const from = path.join('uploads', String(req.user.id), filename);
        const to = path.join('uploads', String(userId), filename);
        fs.mkdirSync(path.join('uploads', String(userId)), { recursive: true });
        fs.copyFileSync(from, to);
    })
    res.json({ message: 'แชร์สำเร็จ' });
}) 
    













// เริ่มเซิร์ฟเวอร์
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}  ไอสาส`);
});



