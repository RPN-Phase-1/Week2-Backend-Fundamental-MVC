class HospitalView {
  static registerView(objArr) {
    console.log(`save data success {"username":${objArr[0].username},"password":${objArr[0].password},"role":${objArr[0].position}. Total employee : ${objArr[1]}}`);
  }

  static loginView(employee) {
    console.log(`Berhasil login!\nWelcome ${employee.username}, anda adalah ${employee.position}`);
  }

  static logout(employee) {
    console.log(`${employee.username} berhasil logout`);
  }

  // lanjutkan method lain

  static errorView(err) {
    console.log(err);
  }

  static help() {
    console.log(
      "// HOSPITAL INTERFACE COMMAND\n /* \n > node index.js register <username> <password> <jabatan> \n > node index.js login <username> <password> \n > node index.js addPatient <id> <namaPasien> <penyakit1> <penyakit2> .... \n > node index.js updatePatient <id> <namaPasien> <penyakit1> <penyakit2> .... \n > node index.js deletePatient <id> <namaPasien> <penyakit1> <penyakit2> .... \n > node index.js logout \n > node index.js show <employee/patient> \n > node index.js findPatientBy: <name/id> <namePatient/idPatient> \n \n NOTE : \n \n 1. HANYA DOKTER SAJA YANG BOLEH PAKAI COMMAND CRUD PATIENT. \n 2. TIDAK BISA LOGIN BERSAMAAN. \n 3. HANYA ADMIN SAJA YANG BISA MELIHAT SEMUA DATA EMPLOYEE. \n \n */"
    );
  }
}

module.exports = HospitalView;
