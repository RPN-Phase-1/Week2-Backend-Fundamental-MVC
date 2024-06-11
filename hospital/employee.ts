import { readFileSync, writeFileSync } from "node:fs";

export default class Employee {
  public login = false;
  public constructor(public username: string, public password: string, public position: string) {}

  public static register(username: string, password: string, position: string): [Employee, number] {
    const employee = Employee.findAll();
    const newEmployee = new Employee(username, password, position);
    employee.push(newEmployee);
    Employee.writeFile(employee);
    return [newEmployee, employee.length];
  }

  public static login(username: string, password: string) {
    const employee = Employee.findAll();
    const isLogin = employee.find(x => x.login);
    if (typeof isLogin !== "undefined") throw "Sedang login ! Silahkan Logout terlebih dahulu";
    const em = employee.find(x => x.username === username && x.password === password);
    if (!em) throw "Username atau password tidak terigristrasi";
    em.login = true;
    Employee.writeFile(employee);
    return em;
  }

  public static logout() {
    const employee = Employee.findAll();
    const em = employee.find(x => x.login);
    if (typeof em !== "undefined") {
      em.login = false;
      Employee.writeFile(employee);
    }
  }

  private static findAll() {
    let data: any = [];
    try {
      data = JSON.parse(readFileSync("./employee.json").toString());
    } catch {}
    return data as Employee[];
  }

  private static writeFile(datas: Employee[]) {
    writeFileSync("./employee.json", JSON.stringify(datas, null, 2));
  }
}
