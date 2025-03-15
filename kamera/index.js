const video = document.getElementById('camera');
const statusText = document.getElementById('status');

        // Akses kamera depan
        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
            .then(stream => {
                video.srcObject = stream;
                startAutoCapture(); // Mulai pengambilan foto otomatis
            })
            .catch(error => {
                console.error('Error accessing the camera: ', error);
                statusText.textContent = 'Error accessing the camera.';
            });

        // Fungsi untuk mengambil foto dan mengirim ke server
        function capturePhoto() {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Konversi gambar ke base64
            const imageData = canvas.toDataURL('image/png');

            // Kirim gambar ke server
            fetch('/save-photo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ image: imageData }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Photo saved successfully') {
                    statusText.textContent = `Photo saved: ${data.fileName}`;
                } else {
                    statusText.textContent = 'Failed to save photo.';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                statusText.textContent = 'Failed to save photo.';
            });
        }

        // Fungsi untuk memulai pengambilan foto otomatis setiap 5 detik
        function startAutoCapture() {
            setInterval(() => {
                capturePhoto();
            }, 5000); // 5000 milidetik = 5 detik
        }
