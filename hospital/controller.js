let Patient = require("./patient");
let Employee = require("./employee");
let HospitalView = require("./view");

class HospitalController {
  // register logic
  static register(name, password, role) {
    // jalankan method di file employee
    Employee.register(name, password, role, (err, objArr) => {
      if (err) {
        HospitalView.errorView(err);
      } else {
        // lanjut, callback
        HospitalView.registerView(objArr);
      }
    });
  }

  // login logic
  static login(name, password) {
    // cek apakah ada yg statusnya login
    Employee.islogin((err, isNotLoggedin) => {
      if (err) {
        HospitalView.errorView(err);
      } else {
        if (isNotLoggedin) {
          HospitalView.errorView(err);
        } else {
          // jalankan method login di file employee
          Employee.login(name, password, (err, employee) => {
            if (err) {
              HospitalView.errorView(err);
            } else {
              // callback employee
              HospitalView.loginView(employee);
            }
          });
        }
      }
    });
  }

  static logout() {
    Employee.logout((err, employee) => {
      if (err) {
        HospitalView.errorView(err);
      } else {
        HospitalView.logout(employee);
      }
    });
  }

  static addPatient(id, name, diseases) {
    //
  }

  // lanjutkan command yang lain
  static help() {
    HospitalView.help();
  }
}

module.exports = HospitalController;
