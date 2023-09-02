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
      Employee.roleLogin().then(() => {
        HospitalView.someoneHasLoginView();
      }).catch(() => {
        Employee.login(username, password).then(() => {
          HospitalView.loginView(username)
        }).catch(() => {
          HospitalView.loginFailedView();
        })
      })
    }

    static logout() {
      Employee.logout().then((data) => {
        HospitalView.logoutView(data)
      }).catch(() => {
        HospitalView.logoutNotFound();
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
          if (err === 404) {
            HospitalView.patientNotFoundView()
          } else {
            HospitalView.ErrorView(err);
          }
        })
      }).catch(() => {
        HospitalView.notLoginView()
      })
    }

    static deletePatient(id) {
      Employee.roleLogin().then(() => {
        Patient.deletePatient(id).then((data) => {
          HospitalView.deletePatientView(data)
        }).catch((err) => {
          if (err === 404) {
            HospitalView.patientNotFoundView()
          } else {
            HospitalView.ErrorView(err);
          }
        })
      }).catch(() => {
        HospitalView.notLoginView()
      })
    }

    static show(type) {
      Employee.roleLogin().then(position => {
        if (position === 'admin') {
          if (type === 'employee') {
            Employee.show().then((employess) => {
              HospitalView.showView(employess)
            }).catch(err => {
              HospitalView.ErrorView(err)
            });
          } else if (type === 'patient') {
            Patient.show().then((employess) => {
              HospitalView.showView(employess)
            }).catch(err => {
              HospitalView.ErrorView(err)
            });
          } else {
            HospitalView.helpView()
          }
        } else {
          HospitalView.forbiddenView('show')
        }
      }).catch(() => {
        HospitalView.notLoginView()
      })
    }
}


module.exports = HospitalController;