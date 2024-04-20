const fs = require("fs").promises;

class Employee {
  constructor(username, password, position) {
    this.username = username;
    this.password = password;
    this.position = position;
    this.login = false;
  }

  static async register(username, password, role) {
    try {
      const data = await this.findAll();

      if (!username || !password || !role) {
        throw new Error(
          "[Registration Failed] Username, password and role are required",
        );
      }

      if (role.toUpperCase() === "DOCTOR" || role.toUpperCase() === "ADMIN") {
        const employee = new Employee(username, password, role.toUpperCase());
        data.push(employee);
        await fs.writeFile("./employee.json", JSON.stringify(data, null, 2));
        return [employee, data.length];
      } else {
        throw new Error(
          `[Registration Failed] "${role}" is invalid role. The valid roles are <doctor> or <admin>`,
        );
      }
    } catch (error) {
      throw error;
    }
  }

  static async alreadyLogin() {
    try {
      const data = await this.findAll();
      const employee = data.find(({ login }) => login === true);

      if (employee) {
        return employee.position;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  static async login(username, password) {
    try {
      const data = await this.findAll();
      const isLogin = await this.alreadyLogin();

      if (isLogin) {
        throw new Error(`[Login Failed] ${isLogin} is already logged in`);
      }

      const employee = data.find(
        (emp) => emp.username === username && emp.password === password,
      );

      if (employee) {
        employee.login = true;
        await fs.writeFile("./employee.json", JSON.stringify(data, null, 2));
        return employee;
      } else {
        throw new Error("[Login Failed] Incorrect username or password");
      }
    } catch (error) {
      throw error;
    }
  }

  static async logout() {
    try {
      const data = await this.findAll();
      const employee = data.find(({ login }) => login === true);

      if (employee) {
        employee.login = false;
        await fs.writeFile("./employee.json", JSON.stringify(data, null, 2));
        return employee;
      } else {
        throw new Error("[Login Required] You are not logged in yet");
      }
    } catch (error) {
      throw error;
    }
  }

  static async show(role) {
    try {
      const data = await this.findAll();

      if (role === "ADMIN") {
        return data;
      } else {
        throw new Error("[Permission Denied] You are not authorized");
      }
    } catch (error) {
      throw error;
    }
  }

  static async findAll() {
    try {
      const data = await fs.readFile("./employee.json", "utf8");
      return JSON.parse(data);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Employee;
