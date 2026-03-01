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
    console.log(files);
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

// function confim ลบไฟล์
 async function deleteFile(filename, owner) {
    if (!confirm('ลบไฟล์' + filename + 'จริงไหม')) return;
    const fileDelete = '/files/' + owner + '/' + filename;
    await fetch(fileDelete, {
        method: 'delete',
        headers : { 'Authorization': 'Bearer ' + token }
    });    
    loadFiles(); 
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
        else if (selected === 'other') 
        if (!imageExts.includes(ext) && ext !== 'pdf') {
                row.style.display = '';
            } else {
                row.style.display = 'none';
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
        const owner =  row.children[1].textContent;
        if (!selected || owner === selected) {
            row.style.display = '';
        }else {
            row.style.display = 'none';
        }
    });
});


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

/// สร้าง Backup
async function loadBackups() {
    const listBackup = await fetch('/backups', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    });
    const listFile = await listBackup.json();
    const showList = document.getElementById("backupList");
     showList.innerHTML = '';
    listFile.forEach(function(list) {
     showList.innerHTML += `<div>${list}<button onclick="listBackupFiles('${list}')">ดูไฟล์</button></div>`;
    })
} 
/// ขั้นตอน recovery
async function listBackupFiles(filename) {
    const recoveryFile = await fetch('/backup/' + filename + '/list', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    });
    
    const fromSize = await recoveryFile.json();
    const boxShow = document.getElementById('recoveryList');
    boxShow.innerHTML = ''; 

    fromSize.forEach(function(listSF) {
        boxShow.innerHTML += `
            <div>
                <input type="checkbox" class="backup-check" value="${listSF.path}" />
                <span>${listSF.path} (${listSF.size} bytes)</span>
            </div>`;
    });
    boxShow.innerHTML += `<button onclick="recoveryFiles('${filename}')">กู้คืนไฟล์ที่เลือก</button>`
}
/// แสดงรายการสำหรับกู้คืนได้
 async function recoveryFiles(filename) {
    const checked = document.querySelectorAll('#recoveryList input[type="checkbox"]:checked');
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



