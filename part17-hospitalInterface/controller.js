let Patient = require('./patient');
let Employee = require('./employee');
let HospitalView = require('./view');

class HospitalController {
  static register(name, password, role) {
    Employee.register(name, password, role, (err, objArr) => {
      if (err) {
        HospitalView.ErrorView(err);
      } else {
        HospitalView.registerView(objArr);
      }
    });
  }

  // lanjutkan command yang lain
}

module.exports = HospitalController;
