// ===== script.js สำหรับหน้า Login + Register =====

// --- สลับฟอร์ม Login / Register ---
document.getElementById('showRegister').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.remove('hidden');
    document.getElementById('errorMsg').classList.add('hidden');
    document.getElementById('successMsg').classList.add('hidden');
});

document.getElementById('showLogin').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('registerForm').classList.add('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('errorMsg').classList.add('hidden');
    document.getElementById('successMsg').classList.add('hidden');
});

// --- สมัครสมาชิก ---
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;

    if (password !== confirmPassword) {
        const errorMsg = document.getElementById('errorMsg');
        errorMsg.textContent = 'password ไม่ตรงกัน';
        errorMsg.classList.remove('hidden');
        document.getElementById('successMsg').classList.add('hidden');
        return;
    }

    const res = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (!res.ok) {
        const errorMsg = document.getElementById('errorMsg');
        errorMsg.textContent = data.error;
        errorMsg.classList.remove('hidden');
        document.getElementById('successMsg').classList.add('hidden');
        return;
    }

    // สมัครสำเร็จ → โชว์ข้อความ + สลับกลับไปฟอร์ม login
    const successMsg = document.getElementById('successMsg');
    successMsg.textContent = data.message + ' — เข้าสู่ระบบได้เลย';
    successMsg.classList.remove('hidden');
    document.getElementById('errorMsg').classList.add('hidden');
    document.getElementById('registerForm').classList.add('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
});

// --- Login ---
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
    if (data.user.role === 'admin'|| data.user.role === 'superadmin') {
        window.location.href = '/page/admin/dashboard.html';
    } else {
        window.location.href = '/page/user/home.html';
    }
});
