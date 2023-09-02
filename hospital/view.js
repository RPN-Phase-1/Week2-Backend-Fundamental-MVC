class HospitalView {
  static registerView(objArr) {
      console.log(`save data success {"username":${objArr[0].username},"password":${objArr[0].password},"role":${objArr[0].position}. Total employee : ${objArr[1]}`)
  }

  static addPatientView(data) {
    console.log(`save data success {"id":${data[0].id}, "name": ${data[0].name}, diseases: ${data[0].diseases}} Total patient : ${data[1]}`)
  }

  static updatePatientView(data) {
    console.log(`save data success {"id":${data.id}, "name": ${data.name}, diseases: ${data.diseases}}`)
  }

  static forbiddenView(command) {
    console.log(command + ' tidak bisa diakses karena role kamu tidak memiliki privillege')
  }

  static notLoginView() {
    console.log('kamu harus login terlebih dahulu')
  }
  
  static ErrorView(message) {
    console.log(`terjadi kesalahan ${message}`)
  }
  // lanjutkan method lain

  static loginView(username) {
    console.log(`Selamat datang ${username}`)
  }

  static loginFailedView() {
    console.log('username atau password salah');
  }

  static deletePatientView(id) {
    console.log(`data patien dengan id = ${id} berhasil dihapus`)
  }

  static patientNotFoundView() {
    console.log('data patient tidak ditemukan')
  }
}


module.exports = HospitalView;