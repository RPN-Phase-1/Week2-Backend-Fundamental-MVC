class HospitalView {
    static registerView(objArr) {
        console.log(`save data success {"username":${objArr[0].username},"password":${objArr[0].password},"role":${objArr[0].position}. Total employee : ${objArr[1]}`)
    }
    static ErrorView(err) {
        console.log(err)
    }
    static loginView(dataUser){
        console.log(`Selamat datang ${dataUser[0].username}, Berikut adalah command yang bisa digunakan`)
        console.log("----------------------------------")
        console.log("> node index.js logout")
        console.log("> node index.js addPatient <id> <namaPasien> <penyakit1> <penyakit2> ....")
        console.log("> node index.js updatePatient <id> <namaPasien> <penyakit1> <penyakit2> ....")
        console.log("> node index.js deletePatient <id> <namaPasien> <penyakit1> <penyakit2> ....")
        console.log("> node index.js show <patient> ")
        if(dataUser.role=="admin"){
            console.log("> node index.js show <employee> ")
        }
        console.log("----------------------------------")
    }
    static helpView(code){
        console.log("--- HOSPITAL INTERFACE COMMAND ---")
        console.log("----------------------------------")
        if(code ==0 ){
            console.log("> node index.js register <username> <password> <jabatan>")
            console.log("> node index.js login <username> <password>")
        } else if(code>0){
            console.log("> node index.js logout")
            console.log("> node index.js addPatient <id> <namaPasien> <penyakit1> <penyakit2> ....")
            console.log("> node index.js updatePatient <id> <namaPasien> <penyakit1> <penyakit2> ....")
            console.log("> node index.js deletePatient <id> <namaPasien> <penyakit1> <penyakit2> ....")
            console.log("> node index.js show <patient> ")
            console.log("> node index.js findPatientBy: <name/id> <namePatient/idPatient></penyakit2>")
        }
        if(code>1){
            console.log("> node index.js show <employee> ")
        }
        console.log("----------------------------------")

    }
    // lanjutkan method lain
}


module.exports = HospitalView;