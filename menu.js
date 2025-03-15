const { select } = require('@inquirer/prompts');
const { exec } = require('child_process');
const os = require('os'); // Modul untuk mendeteksi sistem operasi
const chalk = require('chalk').default;
const figlet = require('figlet');

function showBanner() {
    console.log(
        chalk.yellowBright(
            figlet.textSync('Fraxzz', {
                font: 'standard',
                horizontalLayout: 'default',
                verticalLayout: 'default',
            })
        )
    );

    console.log(chalk.blueBright('Hallo Iam Fraxzz'))
    console.log(chalk.magentaBright('=================='))
}

async function main() {
    showBanner()

    const choice = await select({
        message: 'Pilih opsi:',
        choices: [
            { value: '1', name: 'Camera' }, // Opsi 1
            { value: '2', name: 'Location' },          // Opsi 2
            { value: '3', name: 'Keluar' },          // Opsi 3
        ],
    });

    switch (choice) {
        case '1':
                console.log('Menjalankan server...');

                // Jalankan server.js menggunakan child_process
                const cameraProcess = exec('node camera.js', (error, stdout, stderr) => {
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
                cameraProcess.stdout.on('data', (data) => {
                    console.log(data);
                });

                cameraProcess.stderr.on('data', (data) => {
                    console.error(data);
                });

                cameraProcess.on('close', (code) => {
                    console.log(`Server berhenti dengan kode: ${code}`);
                });
            break;

        case '2':
            console.log('Menjalankan server...');

                // Jalankan server.js menggunakan child_process
                const locationProcess = exec('node location.js', (error, stdout, stderr) => {
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
                locationProcess.stdout.on('data', (data) => {
                    console.log(data);
                });

                locationProcess.stderr.on('data', (data) => {
                    console.error(data);
                });

                locationProcess.on('close', (code) => {
                    console.log(`Server berhenti dengan kode: ${code}`);
                });
            break;

        case '3':
            console.log('Keluar dari program...');
            return;

        default:
            console.log('Pilihan tidak valid.');
    }
}

// Jalankan program
main();