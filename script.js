// ===== script.js สำหรับหน้า Login (ชั่วคราว — ยังไม่มี middleware ฝั่ง server) =====

// จับ form login ตอน submit
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // กัน form reload หน้า

    // ดึงค่าจาก input
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // ส่ง POST /login ไป server
    const res = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    // ถ้า login ไม่สำเร็จ → โชว์ error
    if (!res.ok) {
        const errorMsg = document.getElementById('errorMsg');
        errorMsg.textContent = data.error;
        errorMsg.classList.remove('hidden');
        return;
    }

    // ถ้า login สำเร็จ → เก็บ token ใน localStorage
    localStorage.setItem('token', data.token );
    localStorage.setItem('tokenname', data.user.username);


    // redirect ตาม role
    if (data.user.role === 'admin') {
        window.location.href = '/page/admin/dashboard.html';
    } else {
        window.location.href = '/page/user/home.html';
    }
});
