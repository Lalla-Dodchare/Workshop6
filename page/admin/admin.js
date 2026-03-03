// --- function  เช็คว่า login แล้วหรือยัง ---
const token = localStorage.getItem('token')
if (!token) {
    window.location.href = '/index.html';
}

// ปุ่ม uploade
async function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    if (!file) {
        alert('กรุณาเลือกไฟล์ก่อนอัปโหลด')
        return;
    } const formData = new FormData();
    formData.append('file',file);
    const response = await fetch('/upload', {
        method : 'POST',
        headers : {
            'Authorization': `Bearer ${token}`
        },
        body : formData
    }) 
    if (response.ok) {
        alert('อัปโหลดไฟลืสำเร็จ')
        fileInput.value = '';
        loadFiles();
    } else { 
        const data = await response.json();
        alert(data.error);     
    }
}




// ปุ่ม share
async function shareFile(filename, owner) {
    const target = prompt('ใส่ username ที่ต้องการแชร์ไฟล์ให้, all');

    if (!target) return;
    let targetUsers;

    if (target.toLowerCase() === 'all') {
        targetUsers = ['all'];
    } else {
        targetUsers = target.split(',');
    }
    const res = await fetch('/share', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ filename, targetUsers })
    });

    const data = await res.json();
    alert(data.message);
    loadFiles();
}


// ปุ่ม Download
async function download(filename, owner) {
    const res = await fetch('/download/' + owner + '/' + filename, {
        headers : { 'Authorization': 'Bearer ' + token }
    });

    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
};


async function loadUsers() {
    const  res = await fetch('/users', {
        headers : { 'Authorization':'Bearer ' + token }
    });
    if (!res.ok) {
        console.log('โหลดไฟล์ไม่ได้');
        return;
    }
    const showUserRes = await res.json();
    const showFile = document.getElementById('userTable');
    showFile.innerHTML = '';

    showUserRes.forEach(function(user) {
        showFile.innerHTML +=
        `<tr class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
            <td class="py-3 px-6 text-left text-gray-700">${user.id}</td>
            <td class="py-3 px-6 text-left text-gray-700 font-medium">${user.username}</td>
            <td class="py-3 px-6 text-left">
                <span class="${user.role === 'superadmin' ? 'bg-purple-100 text-purple-700' : user.role === 'admin' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'} text-xs px-2 py-1 rounded-full">${user.role}</span>
            </td>
            <td class="py-3 px-6 text-center">
                <button onclick="editUser(${user.id})" class="bg-amber-500 hover:bg-amber-600 text-white text-xs py-1.5 px-4 rounded shadow-sm transition duration-200 cursor-pointer">Edit</button>
            </td>
            <td class="py-3 px-6 text-center">
                <button onclick="deleteUser(${user.id})" class="bg-red-500 hover:bg-red-600 text-white text-xs py-1.5 px-4 rounded shadow-sm transition duration-200 cursor-pointer">Delete</button>
            </td>
            <td class="py-3 px-6 text-center">
                <button onclick="banuser(${user.id})" class="${user.banned ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 hover:bg-gray-600'} text-white text-xs py-1.5 px-4 rounded shadow-sm transition duration-200 cursor-pointer">${user.banned ? 'ปลดแบน' : 'แบน'}</button>
            </td>
        </tr>`;
    })
}







// function ที่โหลดรายการไฟล์
async function loadFiles() {
    const res = await fetch('/files', {
        headers : { 'Authorization': 'Bearer ' + token }
    });
    if (!res.ok) {
        console.log('โหลดไฟล์ไม่ได้');
        return;
    }
    const files = await res.json();
    const dataTable = document.getElementById("dataTable");
    dataTable.innerHTML = '';

  files.forEach(function(file) {
    dataTable.innerHTML += `
    <tr class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
        <td class="py-3 px-6 text-left text-sm text-gray-700 font-medium">${file.filename}</td>
        
        <td class="py-3 px-6 text-left text-sm text-gray-500">
            <span class="${ file.owner === '1' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700' } text-xs px-2 py-1 rounded-full">
            ${ file.role === 'superadmin' ? 'superadmin':  
               file.role === 'admin' ? 'admin':'User'
            } 
            </span>
        </td>

        <td class="py-3 px-6 text-left text-sm text-gray-700">
            ${file.username}
        </td>

        
        <td class="py-3 px-6 text-center">
            <button onclick="download('${file.filename}', '${file.owner}')" 
                class="bg-blue-500 hover:bg-blue-600 text-white text-xs py-1.5 px-4 rounded shadow-sm transition duration-200">
                Download
            </button>
        </td>
        
        <td class="py-3 px-6 text-center">
            <button onclick="deleteFile('${file.filename}','${file.owner}')" 
                class="bg-red-500 hover:bg-red-600 text-white text-xs py-1.5 px-4 rounded shadow-sm transition duration-200">
                Delete
            </button>
        </td>


        <td class="py-3 px-6 text-center">
            <button onclick="shareFile('${file.filename}', '${file.owner}')" 
                class="bg-blue-500 hover:bg-blue-600 text-white text-xs py-1.5 px-4 rounded shadow-sm transition duration-200">
                Share
            </button>
        </td>



    </tr>`;
  });
    /// กรองชื่อ User
    const oweners = [...new Set(files.map(f => f.owner))];
    const userList = document.getElementById('userList');
    userList.innerHTML = ''
    oweners.forEach(function(owener){
        userList.innerHTML += `<option value="${owener}"></option>`;
    });
} 
loadFiles();
loadBackups();
loadUsers();
loadTrash();

// confim ลบไฟล์
 async function deleteFile(filename, owner) {
    if (!confirm('ลบไฟล์' + filename + 'จริงไหม')) return;
    const fileDelete = '/files/' + owner + '/' + filename;
    await fetch(fileDelete, {
        method: 'delete',
        headers : { 'Authorization': 'Bearer ' + token }
    });    
    loadFiles(); 
}

//  confim ลบ user
async function deleteUser(id) {
    if (!confirm('ลบ user คนนี้จริงๆใช่ไหม')) return;
    const userDelete = '/users/' + id;
    await fetch(userDelete, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + token }
    });
    loadUsers();
}


// ปุ่ม แบน
async function banuser(id) {
    if (!confirm('แบน user คนนี้จริงๆใช่ไหม')) return;
    const banUser = await fetch('/users/' + id + '/ban', {
        method: 'PUT',
        headers: { 'Authorization': 'Bearer ' + token }
    });
    const res = await banUser.json();
    alert(res.message);
    loadUsers();
}






async function editUser(id) {
    const username = prompt('ใส่ username ใหม่');
    const password = prompt('ใส่ password ใหม่');
    const role = prompt('ใส่ role ใหม่');
    const url = '/users/' + id; 
    const userEdit = await fetch(url, {
        method: 'PUT',
        headers: { 
            'Authorization': 'Bearer ' + token ,
            'Content-Type': `application/json`
        },
        body: JSON.stringify({ username, password, role })
    });
    const data = await userEdit.json();
    alert(data.message); 
}


/// createUser
async function createUser() {
    const username = document.getElementById('newUsername').value
    const password = document.getElementById('newPassword').value
    const role = document.getElementById('newRole').value
    const createRes = await fetch('/users', {
    method : 'POST',
    headers : {
        'Authorization': `Bearer ${token}`,
        'Content-Type': `application/json`
    },
    body: JSON.stringify({ username, password, role })
  });
  const data = await createRes.json();
  alert(data.message);
  document.getElementById('newUsername').value = '';
  document.getElementById('newPassword').value = '';
  loadUsers();
}



// กรองประเภทไฟล์
document.getElementById('typeFilter').addEventListener('change', function() {
    const selected = this.value;
    const rows = document.querySelectorAll('#dataTable tr');

    rows.forEach(function(row) {
        const filename = row.children[0].textContent;
        const ext = filename.split('.').pop().toLowerCase();

        const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
        if (selected === '') {
            row.style.display = '';
        } 
        else if (selected === 'image') {
            if (imageExts.includes(ext)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        } 
        else if (selected === 'pdf') {
            if (ext === 'pdf') {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        } 
        else if (selected === 'other'){ 
        if (!imageExts.includes(ext) && ext !== 'pdf') {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        }
    })

    

})






// กรองชื่อ file
document.getElementById('searchInput').addEventListener('input', function() {
    const keyword = this.value.toLowerCase();
    const rows = document.querySelectorAll('#dataTable tr');

    rows.forEach(function(row) {
        const text = row.textContent.toLowerCase();
        if (text.includes(keyword)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});


// กรอง User จาก dropdown
document.getElementById('filterUser').addEventListener('input',function(){
    const selected = this.value;
    const row = document.querySelectorAll('#dataTable tr');

    row.forEach(function(row) {
        const owner =  row.children[2].textContent;
        if (!selected || owner === selected) {
            row.style.display = '';
        }else {
            row.style.display = 'none';
        }
    });
});


    ///  backup && recovery

/// แสดงรายการที่ backup
async function backupFile() {
    const res = await fetch('/backup', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + token } 
    });
    const data = await res.json();
    alert(data.message + 'ขนาด:' + data.size + 'bytes');
    loadFiles();
    loadBackups()
}

/// โหลดรายการ Backup แสดงเป็น card
async function loadBackups() {
    const listBackup = await fetch('/backups', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    });
    const listFile = await listBackup.json();
    const showList = document.getElementById("backupList");
    showList.innerHTML = '';

    if (listFile.length === 0) {
        showList.innerHTML = '<p class="text-gray-400 text-sm">ยังไม่มี backup</p>';
        return;
    }

    listFile.forEach(function(backup) {
        // แปลง size ให้อ่านง่าย (bytes → KB/MB)
        let sizeText = backup.size + ' bytes';
        if (backup.size > 1024 * 1024) {
            sizeText = (backup.size / 1024 / 1024).toFixed(2) + ' MB';
        } else if (backup.size > 1024) {
            sizeText = (backup.size / 1024).toFixed(2) + ' KB';
        }

        // แปลงวันที่ให้อ่านง่าย
        const dateText = new Date(backup.date).toLocaleString('th-TH');

        showList.innerHTML += `
        <div class="bg-gray-50 rounded-lg p-4 mb-3 border border-gray-100">
            <div class="flex items-center justify-between">
                <div>
                    <p class="font-medium text-gray-800 text-sm">${backup.filename}</p>
                    <p class="text-gray-400 text-xs mt-1">ขนาด: ${sizeText}  |  วันที่: ${dateText}</p>
                </div>
                <div class="flex gap-2">
                    <button onclick="listBackupFiles('${backup.filename}')"
                        class="bg-blue-500 hover:bg-blue-600 text-white text-xs py-1.5 px-3 rounded transition cursor-pointer">ดูไฟล์</button>
                    <button onclick="recoverAll('${backup.filename}')"
                        class="bg-green-500 hover:bg-green-600 text-white text-xs py-1.5 px-3 rounded transition cursor-pointer">กู้คืนทั้งหมด</button>
                    <button onclick="deleteBackup('${backup.filename}')"
                        class="bg-red-500 hover:bg-red-600 text-white text-xs py-1.5 px-3 rounded transition cursor-pointer">ลบ</button>
                </div>
            </div>
            <div id="recovery-${backup.filename.replace(/\./g, '_')}" class="mt-3 hidden"></div>
        </div>`;
    });
}

/// กดดูไฟล์ → ขยายใต้ card นั้น
async function listBackupFiles(filename) {
    const recoveryFile = await fetch('/backup/' + filename + '/list', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    });

    const fromSize = await recoveryFile.json();
    // หา div ใต้ card ของ backup ตัวนี้
    const boxId = 'recovery-' + filename.replace(/\./g, '_');
    const boxShow = document.getElementById(boxId);

    // ถ้ากดซ้ำ → ซ่อน/แสดง (toggle)
    if (!boxShow.classList.contains('hidden') && boxShow.innerHTML !== '') {
        boxShow.classList.add('hidden');
        return;
    }

    boxShow.innerHTML = '';
    boxShow.classList.remove('hidden');

    fromSize.forEach(function(listSF) {
        boxShow.innerHTML +=
            `<div class="flex items-center gap-2 py-1">
                <input type="checkbox" class="backup-check rounded" value="${listSF.path}" />
                <span class="text-sm text-gray-600">${listSF.path} (${listSF.size} bytes)</span>
            </div>`;
    });
    boxShow.innerHTML += `<button onclick="recoveryFiles('${filename}')"
        class="bg-green-500 hover:bg-green-600 text-white text-xs py-1.5 px-4 rounded mt-3 transition cursor-pointer">กู้คืนไฟล์ที่เลือก</button>`;
}
/// แสดงรายการสำหรับกู้คืนได้
 async function recoveryFiles(filename) {
    const checked = document.querySelectorAll('.backup-check:checked');
    const selectedFiles = [];
    checked.forEach(function(box){
        selectedFiles.push(box.value);
    });
    if (selectedFiles.length === 0) {
        alert ('กรุณาเลือกไฟล์ที่ต้องการกู้คืน');
        return;
    }
    const fileSelect = await fetch('/backup/' + filename + '/recover', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ selectedFiles })
    });
    const res = await fileSelect.json();
    alert(res.message);
    loadFiles();
 }

 /// แสดงรายการไฟล์ที่กู้คืน
async function loadTrash() {
    const file = await fetch('/trash',{
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    const showFile = await file.json();
    const fileTrash = document.getElementById('trashTable');
    fileTrash.innerHTML = '';

    showFile.forEach(function(file) {
        let sizeText = file.size + ' bytes';
        if (file.size > 1024 * 1024) {
            sizeText = (file.size / 1024 / 1024).toFixed(2) + ' MB';
        } else if (file.size > 1024) {
            sizeText = (file.size / 1024).toFixed(2) + ' KB';
        }

        fileTrash.innerHTML +=
        `<tr class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
            <td class="py-3 px-6 text-left text-gray-700 font-medium">${file.filename}</td>
            <td class="py-3 px-6 text-left text-gray-500">${sizeText}</td>
            <td class="py-3 px-6 text-center">
                <button onclick="restoreFile('${file.filename}')" class="bg-green-500 hover:bg-green-600 text-white text-xs py-1.5 px-4 rounded shadow-sm transition duration-200 cursor-pointer">Restore</button>
            </td>
            <td class="py-3 px-6 text-center">
                <button onclick="deletePermanent('${file.filename}')" class="bg-red-500 hover:bg-red-600 text-white text-xs py-1.5 px-4 rounded shadow-sm transition duration-200 cursor-pointer">Delete</button>
            </td>
        </tr>`;
    })
}

///        file ที่ถูกกู้คืนกลับมา
async function restoreFile(filename) {
    const file = await fetch(`/trash/${filename}/restore`, {
        method: 'POST',
        headers: {'Authorization': 'Bearer ' + token }
    });
    const res =  await file.json();
    alert(res.message);
    loadTrash();
}

// ปุ่มลบถาวร
async function deletePermanent(filename) {
    const fileDelete = await fetch(`/trash/${filename}` ,{
        method: 'DELETE',
        headers: {'Authorization': 'Bearer ' + token}
    });
    const res = await fileDelete.json();
    alert(res.message);
    loadTrash();
}

// ปุ่มล้างถังขยะ
async function emptyTrash() {
    if (!confirm('ต้องการล้างถังขยะทั้งหมดจริงไหม')) return;
    const trash = await fetch('/trash' ,{
        method: 'DELETE',
        headers: {'Authorization': 'Bearer ' + token}
    });
    const res = await trash.json();
    alert(res.message);
    loadFiles();
    loadBackups();
    loadTrash();
}

async  function loadLogs(role) {
    
}