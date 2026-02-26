// --- function  เช็คว่า login แล้วหรือยัง ---
const token = localStorage.getItem('token')
if (!token) {
    window.location.href = '/index.html';
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
        
        <td class="py-3 px-6 text-left text-sm text-gray-500">${file.owner}</td>
        
        <td class="py-3 px-6 text-center">
            <button onclick="download('${file.filename}', '${file.owner}')" 
                class="bg-blue-500 hover:bg-blue-600 text-white text-xs py-1.5 px-4 rounded shadow-sm transition duration-200">
                Download
            </button>
        </td>
        
        <td class="py-3 px-6 text-center">
            <button onclick="deleteFile('${file.filename}','${file.owner}')" 
                class="bg-red-500 hover:bg-red-600 text-white text-xs py-1.5 px-4 rounded shadow-sm transition duration-200">
                ลบ
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
// function confim ลบไฟล์
 async function deleteFile(filename, owner) {
    if (!confirm('ลบไฟล์' + filename + 'จริงไหม')) return;
    loadFiles();
    const fileDelete = '/files/' + owner + '/' + filename;
    await fetch(fileDelete, {
        method: 'delete',
        headers : { 'Authorization': 'Bearer ' + token }
    });    
    loadFiles(); 
}

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

