let Patient = require("./patient");
let Employee = require("./employee");
let HospitalView = require("./view");

class HospitalController {
  static async register(username, password, role) {
    try {
      const employee = await Employee.register(username, password, role);
      HospitalView.registerView(employee);
    } catch (error) {
      HospitalView.errorView(error);
    }
  }

  static async login(username, password) {
    try {
      const employee = await Employee.login(username, password);
      if (employee) HospitalView.loginView(employee);
    } catch (error) {
      HospitalView.errorView(error);
    }
  }

  static async logout() {
    try {
      const employee = await Employee.logout();
      HospitalView.logoutView(employee);
    } catch (error) {
      HospitalView.errorView(error);
    }
  }

  static async addPatient(id, name, disease) {
    try {
      const role = await Employee.alreadyLogin();
      if (role === "DOCTOR") {
        const patient = await Patient.addPatient(id, name, disease);
        HospitalView.addPatientView(patient);
      } else {
        throw new Error("[Permission Denied] You are not authorized");
      }
    } catch (error) {
      HospitalView.errorView(error);
    }
  }

  static async updatePatient(id, name, disease) {
    try {
      const role = await Employee.alreadyLogin();
      if (role === "DOCTOR") {
        const patient = await Patient.updatePatient(id, name, disease);
        HospitalView.updatePatientView(patient);
      } else {
        throw new Error("[Permission Denied] You are not authorized");
      }
    } catch (error) {
      HospitalView.errorView(error);
    }
  }

  static async deletePatient(id) {
    try {
      const role = await Employee.alreadyLogin();
      if (role === "DOCTOR") {
        await Patient.deletePatient(id);
        HospitalView.deletePatientView(id);
      } else {
        throw new Error("[Permission Denied] You are not authorized");
      }
    } catch (error) {
      HospitalView.errorView(error);
    }
  }

  static async findPatientBy(opts, value) {
    try {
      const role = await Employee.alreadyLogin();
      if (role === "DOCTOR") {
        const patient = await Patient.findPatientBy(opts, value);
        HospitalView.findPatientView(patient);
      } else {
        throw new Error("[Permission Denied] You are not authorized");
      }
    } catch (error) {
      HospitalView.errorView(error);
    }
  }

  static async show(opts) {
    try {
      const role = await Employee.alreadyLogin();
      if (!opts) {
        throw new Error(
          "[Invalid Option] The valid options are <employee> or <patient>",
        );
      } else if (opts.toLowerCase() === "employee") {
        const employeeData = await Employee.show(role);
        HospitalView.showView(employeeData);
      } else if (opts.toLowerCase() === "patient") {
        const patientData = await Patient.show(role);
        HospitalView.showView(patientData);
      } else {
        throw new Error(
          "[Invalid Option] The valid options are <employee> or <patient>",
        );
      }
    } catch (error) {
      HospitalView.errorView(error);
    }
  }

  static help() {
    HospitalView.helpView();
  }
}

module.exports = HospitalController;
