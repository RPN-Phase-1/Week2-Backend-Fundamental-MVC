class HospitalView {
    static registerView(objArr) {
        console.log(`save data success {"username":${objArr[0].username},"password":${objArr[0].password},"role":${objArr[0].position}. Total employee : ${objArr[1]}`)
    }

    static ErrorView(err){
        console.log(`${err}`)
    }

    static forbiddenView(){
        console.log(`only admin have the power`)
    }

    static loginView(username, password){
        console.log(`login success {"username":${username},"password":${password}}`);
    }

    static logoutView(data){
        console.log(`logout as ${data.username}`);
    }
    static helpView(){
        console.log(
            `
       
            // HOSPITAL INTERFACE COMMAND
            
            > node index.js register <username> <password> <jabatan> 
            > node index.js login <username> <password>
            > node index.js addPatient <id> <namaPasien> <penyakit1> <penyakit2> ....
            > node index.js updatePatient <id> <namaPasien> <penyakit1> <penyakit2> ....
            > node index.js deletePatient <id> <namaPasien> <penyakit1> <penyakit2> ....
            > node index.js logout
            > node index.js show <employee/patient> 
            > node index.js findPatientBy: <name/id> <namePatient/idPatient>
            
            NOTE :
            
            1. HANYA DOKTER SAJA YANG BOLEH PAKAI COMMAND CRUD PATIENT.
            2. TIDAK BISA LOGIN BERSAMAAN.
            3. HANYA ADMIN SAJA YANG BISA MELIHAT SEMUA DATA EMPLOYEE.
            
            
            `
        )
    }
}


module.exports = HospitalView;