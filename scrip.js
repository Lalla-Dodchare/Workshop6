const API = 'http://localhost:3000';

document.getElementById('uploadBtn').addEventListener('click', async () => {
  const file = document.getElementById('fileInput').files[0];
  const result = document.getElementById('uploadResult');

  if (!file) {
    result.textContent = 'Please select a file first.';
    return;
  }

  const formData = new FormData();
  formData.append('file', file);

  try {
    const res = await fetch(`${API}/upload`, { method: 'POST', body: formData });
    const data = await res.json();
    result.textContent = `Success: ${data.originalname} (${data.size} bytes)`;
  } catch {
    result.textContent = 'Upload failed. Is the server running?';
  }
});

document.getElementById('submitBtn').addEventListener('click', async () => {
  const name = document.getElementById('nameInput').value.trim();
  const detail = document.getElementById('detailInput').value.trim();
  const result = document.getElementById('submitResult');

  if (!name || !detail) {
    result.textContent = 'Please fill in all fields.';
    return;
  }

  try {
    const res = await fetch(`${API}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, detail })
    });
    const data = await res.json();
    result.textContent = `Received: ${data.name} - ${data.detail}`;
  } catch {
    result.textContent = 'Submit failed. Is the server running?';
  }
});
