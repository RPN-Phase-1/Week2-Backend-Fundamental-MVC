import Employee from "./employee";
import HospitalView from "./view";

export default class HospitalController {
  public static help() {
    HospitalView.helpView();
  }

  public static async register(username?: string, password?: string, jabatan?: string) {
    if (!username || !password || !jabatan) throw "Argument kurang! masukan <username> <password> <jabatan>";
    const data = await Employee.register(username, password, jabatan);
    HospitalView.registerView(...data);
  }

  public static async login(username?: string, password?: string) {
    if (!username || !password) throw "Argument kurang! masukan <username> <password>";
    const data = await Employee.login(username, password);
    HospitalView.loginView(data);
  }

  public static async logout() {
    await Employee.logout();
    HospitalView.logoutView();
  }

  public static addPatient(patientname?: string, ...symptomps: string[]) {
    if (!patientname || symptomps.length < 1) throw "Argument kurang! masukan <namaPasien> <penyakit1> <penyakit2>"
  }
}
