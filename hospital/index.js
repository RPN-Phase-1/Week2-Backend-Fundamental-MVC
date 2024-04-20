let command = process.argv[2];
let argument = process.argv.slice(3);
let HospitalController = require("./controller");

/*
HOSPITAL INTERFACE COMMAND :

> node index.js [command] [...args]

> node index.js register <username> <password> <role>
> node index.js login <username> <password>
> node index.js addPatient <id> <patientName> <disease1> <disease2> ....
> node index.js updatePatient <id> <patientName> <disease1> <disease2> ....
> node index.js deletePatient <id>
> node index.js logout
> node index.js show <employee/patient>
> node index.js findPatientBy <id/name> <id/patientName>

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
  case "addPatient":
    HospitalController.addPatient(argument[0], argument[1], argument.slice(2));
    break;
  case "updatePatient":
    HospitalController.updatePatient(
      argument[0],
      argument[1],
      argument.slice(2),
    );
    break;
  case "deletePatient":
    HospitalController.deletePatient(argument[0]);
    break;
  case "findPatientBy":
    HospitalController.findPatientBy(argument[0], argument[1]);
    break;
  case "logout":
    HospitalController.logout();
    break;
  case "show":
    HospitalController.show(argument[0]);
    break;
  default:
    HospitalController.help();
}
