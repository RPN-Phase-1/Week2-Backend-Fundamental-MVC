let Patient = require("./patient");
let Employee = require("./employee")
let HospitalView = require("./view");

class HospitalController {
    static register(name, password, role) {
        Employee.roleLogin().then(position => {
          if (position === 'admin') {
            Employee.register(name, password, role, (err, objArr) => {
              if (err) {
                  HospitalView.ErrorView(err);
              } else {
                  HospitalView.registerView(objArr);
              }
            });
          } else {
            HospitalView.forbiddenView('register')
          }
        }).catch(() => {
          HospitalView.notLoginView()
        })
    }

    // lanjutkan command yang lain
    static login(username, password) {
      Employee.login(username, password).then(() => {
        HospitalView.loginView(username)
      }).catch(() => {
        HospitalView.loginFailedView();
      })
    }

    static addPatient(id, name, diseases) {
      Employee.roleLogin().then(() => {
        Patient.addPatient(id, name, diseases).then((data) => {
          HospitalView.addPatientView(data)
        }).catch((err) => {
          HospitalView.ErrorView(err);
        })
      }).catch(role => {
        HospitalView.notLoginView()
      })
    }

    static updatePatient(id, name, diseases) {
      Employee.roleLogin().then(() => {
        Patient.updatePatient(id, name, diseases).then((data) => {
          HospitalView.updatePatientView(data)
        }).catch((err) => {
          HospitalView.ErrorView(err);
        })
      }).catch(role => {
        HospitalView.notLoginView()
      })
    }
}


module.exports = HospitalController;