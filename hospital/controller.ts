import Employee from "./employee";
import HospitalView from "./view";

export default class HospitalController {
  public static help() {
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

  public static register(username?: string, password?: string, jabatan?: string) {
    if (!username || !password || !jabatan) throw "Argument kurang! masukan <username> <password> <jabatan>";
    const data = Employee.register(username, password, jabatan);
    HospitalView.registerView(...data);
  }

  public static login(username?: string, password?: string) {
    if (!username || !password) throw "Argument kurang! masukan <username> <password>";
    const data = Employee.login(username, password);
    HospitalView.loginView(data);
  }

  public static logout() {
    Employee.logout();
    HospitalView.logoutView();
  }
}
