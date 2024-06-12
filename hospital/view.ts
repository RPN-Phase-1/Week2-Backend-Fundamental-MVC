import type Employee from "./employee";

export default class HospitalView {
  public static registerView(data: Employee, dataSize: number) {
    console.log(`save data succes { "username": "${data.username}", "password": "${data.password}", "role": "${data.position} }. Total employee : ${dataSize}`);
  }

  public static loginView(data: Employee) {
    console.log(`Login Approved! Hi ${data.username} (${data.position})`);
  }

  public static logoutView() {
    console.log("Logout");
  }

  public static helpView() {

    const helpMessage = `==========================
HOSPITAL INTERFACE COMMAND
==========================
node index.js register <username> <password> <jabatan>
node index.js login <username> <password>
node index.js addPatient <namaPasien> <penyakit1> <penyakit2> ....
node index.js updatePatient <namaPasien> <penyakit1> <penyakit2> ....
node index.js deletePatient <id>
node index.js logout
node index.js show <employee/patient>
node index.js findPatientBy: <name/id> <namePatient/idPatient>`;
    console.log(helpMessage);
  }

  public static errorView(...messages: any) {
    console.error(...messages);
  }
}
