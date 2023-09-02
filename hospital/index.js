let command = process.argv[2];
let argument = process.argv.slice(3);
let HospitalController = require("./controller");

// HOSPITAL INTERFACE COMMAND
/*
> node index.js register <username> <password> <jabatan> 
> node index.js login <username> <password>
> node index.js addPatient <id> <namaPasien> <penyakit1> <penyakit2> ....
> node index.js updatePatient <id> <namaPasien> <penyakit1> <penyakit2> ....
> node index.js deletePatient <id>
> node index.js logout
> node index.js show <employee/patient> 
> node index.js findPatientBy: <name/id> <namePatient/idPatient>

NOTE :

1. HANYA DOKTER SAJA YANG BOLEH PAKAI COMMAND CRUD PATIENT.
2. TIDAK BISA LOGIN BERSAMAAN.
3. HANYA ADMIN SAJA YANG BISA MELIHAT SEMUA DATA EMPLOYEE.

*/

switch (command) {
    case "register":
      HospitalController.register(argument[0], argument[1], argument[2]);
      break;
    case "login":
      HospitalController.login(argument[0], argument[1]);
      break;
    case "logout":
      HospitalController.logout();
      break;
    case "addPatient":{
      const [id, name, ...diseases] = argument;
      HospitalController.addPatient(id, name, diseases)
      break;
    }
    case "updatePatient":{
      const [id, name, ...diseases] = argument;
      HospitalController.updatePatient(id, name, diseases)
      break;
    }
    case "deletePatient":
      HospitalController.deletePatient(argument[0])
      break;
    case "show":
      HospitalController.show(argument[0]);
      break;
    default:
      HospitalController.help();
      break;
}