let Patient = require("./patient");
let Employee = require("./employee");
let HospitalView = require("./view");

class HospitalController {
    static register(username, password, role) {
        Employee.register(username, password, role, (err, employee, objArr) => {
            if (err) return HospitalView.ErrorView(err);

            HospitalView.registerView(employee, objArr);
        });
    }

    static login(username, password) {
        Employee.login(username, password, (err, employee) => {
            if (err) return HospitalView.ErrorView(err);

            HospitalView.loginView(employee);
        });
    }

    static logout() {
        Employee.logout((err, msg) => {
            if (err) return HospitalView.ErrorView(err);
            
            HospitalView.logoutView(msg);
        })
    }

    static show(type) {
        Employee.show(type, (err, list) => {
            if (err) return HospitalView.ErrorView(err);

            HospitalView.showView(list);
        })
    }

    static addPatient(id, name, penyakit1, penyakit2) {
        Patient.addPatient(id, name, penyakit1, penyakit2, (err, patient) => {
            if (err) return HospitalView.ErrorView(err);

            HospitalView.addPatientView(patient);
        });
    }

    static updatePatient(id, name, penyakit1, penyakit2) {
        Patient.updatePatient(id, name, penyakit1, penyakit2, (err, patient) => {
            if (err) return HospitalView.ErrorView(err);

            HospitalView.updatePatientView(patient);
        })
    }

    static deletePatient(id, name) {
        Patient.deletePatient(id, name, (err, patient) => {
            if (err) return HospitalView.ErrorView(err);

            HospitalView.deletePatientView(patient);
        })
    }

    static findPatientBy(type, field) {
        Patient.findPatientBy(type, field, (err, patient) => {
            if (err) return HospitalView.ErrorView(err);

            HospitalView.findPatientByView(patient);
        })
    }
}

module.exports = HospitalController;
