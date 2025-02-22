class HospitalView {
    // Menampilkan hasil registrasi
    static registerView(objArr) {
        console.log(`✅ Registrasi berhasil!`);
        console.log(`Username: ${objArr[0].username}`);
        console.log(`Role: ${objArr[0].position}`);
        console.log(`Total employee: ${objArr[1]}`);
    }

    // Menampilkan hasil login
    static loginView(user) {
        console.log(`✅ Login berhasil!`);
        console.log(`Selamat datang, ${user.username} (${user.position})`);
    }

    // Menampilkan hasil logout
    static logoutView(message) {
        console.log(`✅ ${message}`);
    }

    // Menampilkan error
    static errorView(errorMessage) {
        console.log(`❌ ERROR: ${errorMessage}`);
    }

    // Menampilkan daftar karyawan (hanya untuk admin)
    static showEmployees(employees) {
        console.log(`📋 Daftar Semua Karyawan:`);
        employees.forEach((emp, index) => {
            console.log(`${index + 1}. ${emp.username} - ${emp.position} (Login: ${emp.login ? "✅" : "❌"})`);
        });
    }

    // Menampilkan pesan bantuan / command list
    static help() {
        console.log(`
==========================
📌 HOSPITAL INTERFACE COMMAND 📌
==========================
node index.js register <username> <password> <jabatan>
node index.js login <username> <password>
node index.js addPatient <namaPasien> <penyakit1> <penyakit2> ....
node index.js updatePatient <namaPasien> <penyakit1> <penyakit2> ....
node index.js deletePatient <id>
node index.js logout
node index.js show <employee/patient>
node index.js findPatientBy: <name/id> <namePatient/idPatient>

⚠️ NOTE:
1️⃣ HANYA DOKTER yang boleh menggunakan command CRUD pasien.
2️⃣ TIDAK BISA login bersamaan.
3️⃣ HANYA ADMIN yang bisa melihat semua data karyawan.
`);
    }
}

module.exports = HospitalView;
