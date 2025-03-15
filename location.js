const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs'); // Tambahkan modul filesystem
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'lokasi')));

// Route untuk halaman utama
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'lokasi', 'index.html'));
});

// Route untuk menerima data lokasi
app.post('/location', (req, res) => {
  const location = req.body;
  const logEntry = {
    timestamp: new Date().toISOString(),
    data: location
  };

  // Format data untuk log
  const logLine = JSON.stringify(logEntry) + '\n';

  // Simpan ke file logs.txt
  fs.appendFile('logs.txt', logLine, (err) => {
    if (err) {
      console.error('Gagal menyimpan log:', err);
      return res.status(500).json({ error: 'Gagal menyimpan data' });
    }
    
    console.log('Lokasi yang diterima:', location);
    res.status(200).json({ message: 'Lokasi diterima dan disimpan' });
  });
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});