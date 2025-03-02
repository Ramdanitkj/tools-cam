const express = require("express")
const app = express();
const path = require('path');
const fs = require('fs');

// Tingkatkan batas ukuran payload menjadi 10MB
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Middleware untuk menyajikan file statis dari folder 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint untuk menyimpan gambar
app.post('/save-photo', (req, res) => {
    const { image } = req.body; // Data gambar dalam format base64
    const base64Data = image.replace(/^data:image\/png;base64,/, ''); // Hapus header base64
    const fileName = `photo_${Date.now()}.png`; // Nama file unik
    const filePath = path.join(__dirname, 'public', 'photos', fileName); // Path penyimpanan

    // Simpan gambar ke folder 'public/photos'
    fs.writeFile(filePath, base64Data, 'base64', (err) => {
        if (err) {
            console.error('Error saving photo:', err);
            return res.status(500).send('Yang sabar yah :)');
        }
        res.send({ message: 'Photo saved successfully', fileName });
    });
});

// Jalankan server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});