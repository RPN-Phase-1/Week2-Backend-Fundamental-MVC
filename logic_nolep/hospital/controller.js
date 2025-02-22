let Patient = require("./patient");
let Employee = require("./employee");
let HospitalView = require("./view");

class HospitalController {
    // Registrasi karyawan (Admin atau Dokter)
    static register(name, password, role) {
        Employee.register(name, password, role, (err, objArr) => {
            if (err) {
                HospitalView.ErrorView(err);
            } else {
                HospitalView.registerView(objArr);
            }
        });
    }

    // Login karyawan
    static login(username, password) {
        Employee.login(username, password, (err, user) => {
            if (err) {
                HospitalView.ErrorView(err);
            } else {
                HospitalView.loginView(user);
            }
        });
    }

    // Logout karyawan
    static logout() {
        Employee.logout((err, message) => {
            if (err) {
                HospitalView.ErrorView(err);
            } else {
                HospitalView.logoutView(message);
            }
        });
    }

    // Menambah pasien (Hanya bisa dilakukan oleh Dokter)
    static addPatient(id, name, diseases) {
        Employee.checkDoctorPermission((err, isDoctor) => {
            if (err) {
                HospitalView.ErrorView(err);
            } else if (!isDoctor) {
                HospitalView.ErrorView("Hanya dokter yang dapat menambahkan pasien.");
            } else {
                Patient.addPatient(id, name, diseases, (err, patient) => {
                    if (err) {
                        HospitalView.ErrorView(err);
                    } else {
                        HospitalView.addPatientView(patient);
                    }
                });
            }
        });
    }

    // Update data pasien (Hanya bisa dilakukan oleh Dokter)
    static updatePatient(id, name, diseases) {
        Employee.checkDoctorPermission((err, isDoctor) => {
            if (err) {
                HospitalView.ErrorView(err);
            } else if (!isDoctor) {
                HospitalView.ErrorView("Hanya dokter yang dapat memperbarui data pasien.");
            } else {
                Patient.updatePatient(id, name, diseases, (err, patient) => {
                    if (err) {
                        HospitalView.ErrorView(err);
                    } else {
                        HospitalView.updatePatientView(patient);
                    }
                });
            }
        });
    }

    // Menghapus pasien (Hanya bisa dilakukan oleh Dokter)
    static deletePatient(id) {
        Employee.checkDoctorPermission((err, isDoctor) => {
            if (err) {
                HospitalView.ErrorView(err);
            } else if (!isDoctor) {
                HospitalView.ErrorView("Hanya dokter yang dapat menghapus data pasien.");
            } else {
                Patient.deletePatient(id, (err, message) => {
                    if (err) {
                        HospitalView.ErrorView(err);
                    } else {
                        HospitalView.deletePatientView(message);
                    }
                });
            }
        });
    }

    // Menampilkan data Employee atau Patient
    static show(type) {
        if (type === "employee") {
            Employee.getAllEmployees((err, employees) => {
                if (err) {
                    HospitalView.ErrorView(err);
                } else {
                    HospitalView.showEmployeesView(employees);
                }
            });
        } else if (type === "patient") {
            Patient.getAllPatients((err, patients) => {
                if (err) {
                    HospitalView.ErrorView(err);
                } else {
                    HospitalView.showPatientsView(patients);
                }
            });
        } else {
            HospitalView.ErrorView("Tipe data tidak valid. Gunakan 'employee' atau 'patient'.");
        }
    }

    // Mencari pasien berdasarkan nama atau ID
    static findPatientBy(type, value) {
        if (type === "name") {
            Patient.findPatientByName(value, (err, patient) => {
                if (err) {
                    HospitalView.ErrorView(err);
                } else {
                    HospitalView.findPatientView(patient);
                }
            });
        } else if (type === "id") {
            Patient.findPatientById(value, (err, patient) => {
                if (err) {
                    HospitalView.ErrorView(err);
                } else {
                    HospitalView.findPatientView(patient);
                }
            });
        } else {
            HospitalView.ErrorView("Format pencarian tidak valid. Gunakan 'name' atau 'id'.");
        }
    }

    // Menampilkan daftar perintah jika input tidak sesuai
    static help() {
        HospitalView.help();
    }
}

module.exports = HospitalController;
