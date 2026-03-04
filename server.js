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
const { imageSize } = require('image-size');
const { error } = require('console');
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
    fs.mkdirSync(path.join(__dirname, 'trash'),{ recursive: true});

// ===== (มาแกะด้วย) เก็บ record การแชร์ไฟล์ — ใครแชร์อะไรให้ใคร เมื่อไหร่ =====
let shares = JSON.parse(fs.readFileSync('shares.json', 'utf8'));
function saveShares() {
    fs.writeFileSync('shares.json', JSON.stringify(shares, null, 4));
}

// function logActivity() บันทึกว่า "ใคร ทำอะไร เมื่อไหร่" ลงไฟล์ logs.txt
function logActivity(action, username, detail, role) {
    const entry = {
        timestamp : new Date().toISOString(),
        action, username, detail, role
    };
    fs.appendFileSync('logs.txt', JSON.stringify(entry) + '\n');
}

app.get('/logs', authenticateToken, (req, res) => {
    if (req.user.role !== 'admin' && req.user.role !== 'superadmin') {
        return res.status(403).json({ error: 'เฉพาะ super admin กับ admin เท่านั้น'});
    } 
    const read = fs.readFileSync('logs.txt', 'utf8');
    const lineOne = read.split('\n');
    const filter = lineOne.filter(line => line);
    const allLine = filter.map(line => JSON.parse(line));

    const roleFilter = req.query.role;
    let result;
    if (roleFilter) {
        result = allLine.filter(log => {
            return log.role === roleFilter;
        })
    } else {
        result = allLine;
    }
    res.json(result);
})







// ===== API Login (ชั่วคราว — ยังไม่มี middleware ตรวจ token, ยังไม่แยกโฟลเดอร์ตาม user) =====
app.post('/login', (req, res) => {
    // step 1: ดึง username, password จาก body ที่ client ส่งมา
    const { username, password } = req.body;

    // step 2: หาใน array users ว่ามี user ที่ตรงกับ username + password มั้ย
    const user = users.find(u => u.username === username && u.password === password);

    // step 3: ถ้าไม่เจอ → ส่ง error กลับ
    if (!user) {
        logActivity('LOGIN_FAILED', username, 'wrong credentials', 'unknown');
        return res.status(401).json({ error: 'username หรือ password ไม่ถูกต้อง' });
    }
    if (user.banned) {
        logActivity('ACCOUNT_BANNED', username, 'This account is banned.', user.role);
        return res.status(403).json({ error: 'บัญชีนี้ถูกระงับ' });
        
    }

    // step 4: ถ้าเจอ → สร้าง token ฝัง id, username, role ลงไป
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, SECRET_KEY);
    logActivity('LOGIN_SUCCESS', user.id + ':' + user.username, 'loginlegin สำเร็จ', user.role);
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
        logActivity('REGISTER',username, 'new user', 'user')
    })


function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]

    if(!token) {
        logActivity('AUTH_FAILED', 'unknow', 'No token =>' + req.method + ' ' + req.originalUrl, 'unknow');
        return res.status(401).json({ error: 'ไม่มี token'});
    }

    

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            logActivity('TOKEN_ERROR', 'unknow', 'Invalid token =>' + req.method + ' ' + req.originalUrl, 'unknow');
            return res.status(403).json({ error: 'token ไม่ถูกต้อง'});
        }
        req.user = decoded;
        next();
    });
}


// ===== (มาแกะด้วย) ตั้งค่าที่เก็บไฟล์อัปโหลด =====
// — อ่าน X-Folder-Path header จาก frontend เพื่อ upload เข้า subfolder ได้
// — ลบ .. ป้องกัน path traversal → สร้างโฟลเดอร์ถ้ายังไม่มี
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        const subpath = req.headers['x-folder-path'] || '';
        const safe = subpath.replace(/\.\./g, '');
        const userFolder = path.join('uploads', String(req.user.id), safe);
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
    logActivity('UPLOAD_SUCCESS', req.user.id + ':' + req.user.username, req.file.originalname, req.user.role);
    res.json({ message: 'File uploaded successfully', filename: req.file.filename });
});

// ===== (มาแกะด้วย) สร้างโฟลเดอร์ใหม่ =====
// — รับ folderName + path จาก body → สร้างโฟลเดอร์ใน uploads/{userId}/{path}/{folderName}
app.post('/folders', authenticateToken, (req, res) => {
    const { folderName, currentPath } = req.body;
    const safe = (currentPath || '').replace(/\.\./g, '');
    const folderPath = path.join(__dirname, 'uploads', String(req.user.id), safe, folderName);
    fs.mkdirSync(folderPath, { recursive: true });
    logActivity('CREATE_FOLDER', req.user.id + ':' + req.user.username, folderName);
    res.json({ message: 'สร้างโฟลเดอร์สำเร็จ' });
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

// Backup
app.post('/backup', authenticateToken, (req, res) => {
    let backupSource;
    if (req.user.role === 'admin' || req.user.role === 'superadmin'){
        backupSource = path.join(__dirname, 'uploads');
    } else {
        backupSource = path.join(__dirname, 'uploads', String(req.user.id));
    }

    // ===== (มาแกะด้วย) ใส่ userId ในชื่อไฟล์ backup — เพื่อกรองให้เห็นแค่ของตัวเอง =====
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFile = path.join(__dirname, 'backups', `${req.user.id}_${timestamp}.tar.gz`);
    fs.mkdirSync(path.join(__dirname, 'backups'), { recursive: true});

    const output = fs.createWriteStream(backupFile);
    const archive = archiver('tar', { gzip: true});

    output.on('close', () => {
        logActivity('BACKUP', req.user.id + ':' + req.user.username, backupFile, req.user.role);
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
    logActivity('RESTORE', req.user.id + ':' + req.user.username, selectedFiles.join(','), req.user.role);
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
        // ===== (มาแกะด้วย) GET /files ฝั่ง user — รองรับ ?path= สำหรับเข้าโฟลเดอร์ย่อย =====
        // — อ่าน ?path= query → สร้างโฟลเดอร์ถ้ายังไม่มี → วนอ่าน: ถ้าเป็นโฟลเดอร์ส่ง isFolder:true, ถ้าเป็นไฟล์ส่ง metadata
        const subpath = (req.query.path || '').replace(/\.\./g, '');
        const userDir = path.join('uploads', String(req.user.id), subpath);
        fs.mkdirSync(userDir, { recursive: true });
        fs.readdir(userDir, (err, files) => {
            if (err) return res.status(500).json({ error: 'Unable to list files' });
            const result = [];
            files.forEach(function(filename){
                const filePath = path.join(userDir, filename);
                const stat = fs.statSync(filePath);
                if (stat.isDirectory()) {
                    result.push({
                        filename: filename,
                        isFolder: true,
                        modified: stat.mtime
                    });
                    return;
                }
                const ext = path.extname(filename).toLowerCase();
                let dimensions = null;
                try {
                    dimensions = imageSize(fs.readFileSync(filePath));
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
    logActivity('DOWNLOAD', req.user.id + ':' + req.user.username, req.params.filename, req.user.role);
    res.download(filePath);
});




// ให้ Client ดาวน์โหลดไฟล์จาก Server
app.get('/download/:filename', authenticateToken, (req, res) => {
    const filePath = path.join(__dirname, 'uploads', String(req.user.id), req.params.filename);
    logActivity('DOWNLOAD', req.user.id + ':' + req.user.username, req.params.filename, req.user.role);
    res.download(filePath);
});


// Delete สำหรับ  user
app.delete('/files/:filename', authenticateToken, (req, res) => {
    const fileDelete = path.join(__dirname, 'uploads', String(req.user.id), req.params.filename);
    fs.mkdirSync(path.join(__dirname, 'trash', String(req.user.id)), { recursive: true});
    fs.renameSync(fileDelete, path.join(__dirname, 'trash', String(req.user.id), req.params.filename));
    logActivity('DELETE', req.user.id + ':' + req.user.username, req.params.filename, req.user.role);
    res.json({ message: 'ลบสำเร็จ' });
});



// Delete สำหรับ admin
app.delete('/files/:owner/:filename', authenticateToken, (req, res) => {
    const fileDelete = path.join(__dirname, 'uploads', req.params.owner, req.params.filename);
    fs.mkdirSync(path.join(__dirname, 'trash', req.params.owner), { recursive: true});
    fs.renameSync(fileDelete, path.join(__dirname, 'trash', req.params.owner, req.params.filename));
    logActivity('DELETE', req.params.owner + ':' + req.user.username, req.params.filename, req.user.role);
    res.json({ message: 'ลบสำเร็จ'});
})

/// เปิดดู trash
    app.get('/trash', authenticateToken, (req, res) => {
    fs.readdir(path.join(__dirname, 'trash', String(req.user.id)), (err, files) => {
            if (err) return res.status(500).json({ error: 'Unable to list files' });
            const result = [];
            files.forEach(function(filename){
                const filePath = path.join(__dirname,'trash', String(req.user.id), filename);
                const stat = fs.statSync(filePath);
                const ext = path.extname(filename).toLowerCase();
                let dimensions = null;
                try {
                    dimensions = imageSize(fs.readFileSync(filePath));
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
});
// ===== (มาแกะด้วย) เปลี่ยนชื่อไฟล์ =====
// — รับ newName จาก body → fs.renameSync เปลี่ยนชื่อจริงบน disk
app.put('/files/:filename/rename', authenticateToken, (req, res) => {
    const { newName } = req.body;
    const oldPath = path.join(__dirname, 'uploads', String(req.user.id), req.params.filename);
    const newPath = path.join(__dirname, 'uploads', String(req.user.id), newName);
    fs.renameSync(oldPath, newPath);
    logActivity('RENAME', req.user.id + ':' + req.user.username, req.params.filename + ' → ' + newName);
    res.json({ message: 'เปลี่ยนชื่อสำเร็จ' });
});

app.post('/trash/:filename/restore', authenticateToken, (req, res) => {
    fs.mkdirSync(path.join(__dirname, 'uploads', String(req.user.id)), { recursive: true});
    fs.renameSync(path.join(__dirname, 'trash', String(req.user.id), req.params.filename), path.join(__dirname, 'uploads', String(req.user.id), req.params.filename));
    logActivity('RESTORE', req.user.id + ':' + req.user.username, req.params.filename, req.user.role);
    res.json({ message: 'กู้คืนสำเร็จ'});
})

app.delete('/trash', authenticateToken, (req, res) => {
    const trashFolder = path.join(__dirname, 'trash', String(req.user.id));
    const files = fs.readdirSync(trashFolder);
    files.forEach(function(filename) {
        fs.unlinkSync(path.join(trashFolder, filename));
    })
    logActivity('EMPTY_TRASH', req.user.id + ':' + req.user.username, files.length + ' files', req.user.role);
    res.json({ message: 'ลบถาวรทั้งหมดสำเร็จ'});
})


// ===== (มาแกะด้วย) ดาวน์โหลดไฟล์จากถังขยะ — ใช้สำหรับแสดง thumbnail ในหน้าถังขยะ =====
app.get('/trash/download/:filename', authenticateToken, (req, res) => {
    const filePath = path.join(__dirname, 'trash', String(req.user.id), req.params.filename);
    if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'ไม่พบไฟล์ในถังขยะ' });
    res.download(filePath);
});

app.delete('/trash/:filename', authenticateToken, (req, res) => {
    fs.unlinkSync(path.join(__dirname, 'trash', String(req.user.id), req.params.filename));
    logActivity('DELETE_PERMANENT', req.user.id + ':' + req.user.username, req.params.filename, req.user.role);
    res.json({ message: 'ลบถาวรสำเร็จ'});
})
    

    




// ===== (มาแกะด้วย) แชร์ไฟล์ =====
// — รับ filename + usernames จาก body → หา userId จาก username → copy ไฟล์ไปโฟลเดอร์ของคนที่แชร์ให้
// — บันทึก record ลง shares.json ด้วย เพื่อให้หน้า "แชร์กับฉัน" แสดงได้ว่าใครแชร์ให้
app.post('/share', authenticateToken, (req, res) => {
   const {filename, targetUsers} = req.body;

    targetUsers.forEach(function(username) {
        const targetUser = users.find(u => u.username === username);
        if (!targetUser) return;
        const from = path.join('uploads', String(req.user.id), filename);
        const to = path.join('uploads', String(targetUser.id), filename);
        fs.mkdirSync(path.join('uploads', String(targetUser.id)), { recursive: true });
        fs.copyFileSync(from, to);

        // ===== (มาแกะด้วย) บันทึก record แชร์ — เก็บว่า ใครแชร์ไฟล์อะไร ให้ใคร เมื่อไหร่ =====
        shares.push({
            filename: filename,
            fromUserId: req.user.id,
            fromUsername: req.user.username,
            toUserId: targetUser.id,
            toUsername: targetUser.username,
            sharedAt: new Date().toISOString()
        });
    })
    saveShares();
    res.json({ message: 'แชร์สำเร็จ' });
    logActivity('SHARE', req.user.id + ':' + req.user.username, filename + ' → ' + targetUsers.join(', '), req.user.role)
})

// ===== (มาแกะด้วย) ดูรายการไฟล์ที่เกี่ยวกับการแชร์ — ทั้งขาเข้า (คนอื่นแชร์ให้ฉัน) + ขาออก (ฉันแชร์ให้คนอื่น) =====
// — เหมือน Google Drive: "แชร์กับฉัน" แสดงไฟล์ที่คนอื่นแชร์มาให้ + ไฟล์ที่ฉันแชร์ออกไป
app.get('/shared', authenticateToken, (req, res) => {
    const result = [];

    // ขาเข้า — คนอื่นแชร์ให้ฉัน
    const incoming = shares.filter(s => s.toUserId === req.user.id);
    incoming.forEach(s => {
        const filePath = path.join('uploads', String(req.user.id), s.filename);
        let size = 0;
        try { size = fs.statSync(filePath).size; } catch(e) {}
        result.push({
            filename: s.filename,
            direction: 'incoming',
            fromUsername: s.fromUsername,
            toUsername: req.user.username,
            sharedAt: s.sharedAt,
            size: size
        });
    });

    // ขาออก — ฉันแชร์ให้คนอื่น
    const outgoing = shares.filter(s => s.fromUserId === req.user.id);
    outgoing.forEach(s => {
        const filePath = path.join('uploads', String(req.user.id), s.filename);
        let size = 0;
        try { size = fs.statSync(filePath).size; } catch(e) {}
        result.push({
            filename: s.filename,
            direction: 'outgoing',
            fromUsername: req.user.username,
            toUsername: s.toUsername,
            sharedAt: s.sharedAt,
            size: size
        });
    });

    res.json(result);
})




// superadmin crud — ดูรายการ user ทั้งหมด
app.get('/users', authenticateToken, (req, res) => {
    if (req.user.role !== 'superadmin') {
        logActivity('Security Audit', req.user.id + ':' + req.user.role + ':' + req.user.username ,'พยายามเข้ามาใช้งานทั้งที่ไม่มีสิทธิ์', req.user.role)
        return res.status(403).json({ error: 'เฉพาะ Super Admin เท่านั้น' });
    }
    res.json(users.map(u => ({ id: u.id, username: u.username, role: u.role, banned: u.banned })));
});

// superadmin crud — สร้าง user ใหม่
app.post('/users', authenticateToken, (req, res) => {
    if (req.user.role !== 'superadmin') {
        return res.status(403).json({ error: 'เฉพาะ Super Admin เท่านั้น' });
    }
    const { username, password, role } = req.body;

    const repeatUser = users.find(u => u.username === username);
    if (repeatUser) {
        return res.status(400).json({ error: 'username นี้มีคนใช้แล้ว' });
    }

    const newId = Math.max(...users.map(u => u.id)) + 1;
    const newUser = { id: newId, username, password, role };
    users.push(newUser);
    saveUsers();
    logActivity('CREATE_USER', req.user.id + ':' + req.user.username, username + ' (' + role + ')', req.user.role);
    res.json({ message: 'สร้าง user สำเร็จ' });
});

app.put('/users/:id', authenticateToken, (req, res) => {
        if (req.user.role !== 'superadmin') {
            return res.status(403).json({ error: 'เฉพาะ Super Admin เท่านั้น' });
        }
        const user = users.find(u => u.id === Number(req.params.id));
    if (!user) {
        return res.status(404).json({ error: 'ไม่พบ user'})
    }
        const { username, password, role} = req.body
        user.username = username;
        user.password = password;
        user.role = role;
        saveUsers();
        logActivity('EDIT_USER', req.user.id + ':' + req.user.username,username + ' (' + role + ')', req.user.role);
        res.json({ message: 'แก้ไข user สำเร็จ'})
    });

app.delete('/users/:id', authenticateToken,  (req, res) => {
    if (req.user.role !== 'superadmin') {
        return res.status(403).json({ error: 'เฉพาะ Super Admin เท่านั้น' });
    }
    const user = users.find(u => u.id === Number(req.params.id));
    if (!user) {
        return res.status(404).json({ error: 'ไม่พบ user'});
    } users = users.filter(u => u.id !== Number(req.params.id));
    saveUsers();
    logActivity('DELETE_USER', req.user.id + ':' + req.user.username, user.username, req.user.role );
    res.json({message: 'ลบ user สำเร็จ'})
    
})
    


// ===== (มาแกะด้วย) ดูรายการ Backup — กรองตาม userId ถ้าไม่ใช่ admin =====
// — ชื่อไฟล์ backup = "{userId}_{timestamp}.tar.gz" → เช็ค prefix ว่าตรงกับ user ปัจจุบันมั้ย
app.get('/backup-list', authenticateToken, (req, res) => {
    const file = fs.readdirSync(path.join(__dirname, 'backups'))
    const typeFile = file.filter(f => f.endsWith('.tar.gz'))

    // ===== (มาแกะด้วย) กรอง backup ตาม userId — admin เห็นหมด, user เห็นแค่ของตัวเอง =====
    let filtered;
    if (req.user.role === 'admin' || req.user.role === 'superadmin') {
        filtered = typeFile;
    } else {
        filtered = typeFile.filter(f => f.startsWith(req.user.id + '_'));
    }

    // ===== (มาแกะด้วย) ส่ง metadata ด้วย — ขนาดไฟล์ + วันที่สร้าง =====
    const result = [];
    filtered.forEach(function(filename){
        const filePath = path.join(__dirname, 'backups', filename);
        const read = fs.statSync(filePath);
        result.push({
            filename: filename,
            size: read.size,
            date: read.birthtime
        });
    });
    res.json(result);
})

// ลบ backup
app.delete('/backups/:filename', authenticateToken, (req, res) => {
    if (req.user.role !== 'admin' && req.user.role !== 'superadmin') {
        return res.status(403).json({ error: 'เฉพาะ admin เท่านั้น' });
    }
    const filePath = path.join(__dirname, 'backups', req.params.filename);
    fs.unlinkSync(filePath);
    logActivity('DELETE_BACKUP', req.user.id + ':' + req.user.username, req.params.filename, req.user.role);
    res.json({ message: 'ลบ backup สำเร็จ' });
})


// ban user
app.put('/users/:id/ban', authenticateToken, (req, res) => {
    if (req.user.role !== 'superadmin') {
        return res.status(403).json({ error: 'เฉพาะ super admin เท่านั้น'});
    } const user = users.find ( u => u.id === Number(req.params.id));
    if (!user) {
        return res.status(404).json({ error: 'ไม่พบ user'});
    } 
    user.banned = !user.banned;
    saveUsers();
    logActivity('BAN_USER', req.user.id + ':' + req.user.username, user.username, req.user.role );
    res.json({ message: user.banned ? 'แบน user สำเร็จ' : 'ปลดแบน user สำเร็จ' });
})











  







// เริ่มเซิร์ฟเวอร์
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}  ไอสาส`);
});



