const { select } = require('@inquirer/prompts');
const { exec } = require('child_process');

async function main() {
    const choice = await select({
        message: 'Pilih opsi:',
        choices: [
            { value: '1', name: 'Jalankan Server' }, // Opsi 1
            { value: '2', name: 'Opsi 2' },          // Opsi 2
            { value: '3', name: 'Keluar' },          // Opsi 3
        ],
    });

    switch (choice) {
        case '1':
            console.log('Menjalankan server...');
            // Jalankan server.js menggunakan child_process
            const serverProcess = exec('node index.js', (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error menjalankan server: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.error(`Stderr: ${stderr}`);
                    return;
                }
                console.log(`Server output: ${stdout}`);
            });

            // Handle proses server
            serverProcess.stdout.on('data', (data) => {
                console.log(data);
            });

            serverProcess.stderr.on('data', (data) => {
                console.error(data);
            });

            serverProcess.on('close', (code) => {
                console.log(`Server berhenti dengan kode: ${code}`);
            });
            break;

        case '2':
            console.log('Anda memilih Opsi 2');
            break;

        case '3':
            console.log('Keluar dari program...');
            return;

        default:
            console.log('Pilihan tidak valid.');
    }

    // Tampilkan menu lagi setelah memilih
    main();
}

// Jalankan program
main();