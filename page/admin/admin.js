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
    const files = await res.json();
    const dataTable = document.getElementById("dataTable");
    console.log(files);
    if (!res.ok) {
    console.log('โหลดไฟล์ไม่ได้:', files.error);
    return;
    }
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
    
}

loadFiles();



// function ลบไฟล์
 async function deleteFile(filename, owner) {
    if (!confirm('ลบไฟล์' + filename + 'จริงไหม')) return;
    const fileDelete = '/files/' + owner + '/' + filename;
    await fetch(fileDelete, {
        method: 'delete',
        headers : { 'Authorization': 'Bearer ' + token }
    });    
    loadFiles(); 
}
