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

  public static errorView(...messages: any) {
    console.error(...messages);
  }
}
