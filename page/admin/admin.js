// --- function  เช็คว่า login แล้วหรือยัง ---
const token = localStorage.getItem('token')
if (!token) {
    window.location.href = '/index.html';
}

// function ที่โหลดรายการไฟล์
async function loadFiles() {
//     ใช้ get รับ file +token
//    (file +token) = ข้อมูล > htmlแสดงข้อมูลในตาราง
}

// function ลบไฟล์
 async function deleteFile(filename) {
//     ขอคำยืนยังก่อนลบ
//     กดตกลงเพื่อ delete ไฟล์ กับ tohen
//     โหลดรายการใหม่ที่เหลือ
}
