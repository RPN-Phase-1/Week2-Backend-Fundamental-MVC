let Patient = require("./patient");
let Employee = require("./employee");
let HospitalView = require("./view");

class HospitalController {
    static help() {
        HospitalView.helpView();
    }

    static register(name, password, role) {
        if (!name || !password || !role || !["doctor", "admin"].includes(role)) {
            HospitalView.ErrorView("Invalid input: name, password, and role (doctor or admin) are required");
            return;
        }

        Employee.register(name, password, role, (err, objArr) => {
            if (err) {
                HospitalView.ErrorView(err);
            } else {
                HospitalView.registerView(objArr);
            }
        });
    }

    static login(name, password) {
        if (!name || !password) {
            HospitalView.ErrorView("Invalid input: name and password are required");
            return;
        }

        Employee.login(name, password, (err, user) => {
            if (err) {
                HospitalView.ErrorView(err);
            } else {
                HospitalView.loginView(user);
            }
        });
    }

    static logout() {
        Employee.logout((err, user) => {
            if (err) {
                HospitalView.ErrorView(err);
            } else {
                HospitalView.logoutView(user);
            }
        });
    }

    static addPatient(id, name, diseases) {
        if (!id || !name || !diseases.length) {
            HospitalView.ErrorView("Invalid input: id, name, and diseases are required");
            return;
        }

        Employee.findAll((err, data) => {
            if (err) {
                return HospitalView.ErrorView(err);
            }

            Employee.authorize(data, "doctor", (authErr) => {
                if (authErr) {
                    return HospitalView.ErrorView(authErr);
                }

                Patient.add(id, name, diseases, (err, patient) => {
                    if (err) {
                        HospitalView.ErrorView(err);
                    } else {
                        HospitalView.addPatientView(patient);
                    }
                });
            });
        });
    }

    static updatePatient(id, name, diseases) {
        if (!id || !name || !diseases.length) {
            HospitalView.ErrorView("Invalid input: id, name, and diseases are required");
            return;
        }

        Employee.findAll((err, data) => {
            if (err) {
                return HospitalView.ErrorView(err);
            }

            Employee.authorize(data, "doctor", (authErr) => {
                if (authErr) {
                    return HospitalView.ErrorView(authErr);
                }

                Patient.update(id, name, diseases, (err, patient) => {
                    if (err) {
                        HospitalView.ErrorView(err);
                    } else {
                        HospitalView.updatePatientView(patient);
                    }
                });
            });
        });
    }

    static deletePatient(id) {
        if (!id) {
            HospitalView.ErrorView("Invalid input: id is required");
            return;
        }

        Employee.findAll((err, data) => {
            if (err) {
                return HospitalView.ErrorView(err);
            }

            Employee.authorize(data, "doctor", (authErr) => {
                if (authErr) {
                    return HospitalView.ErrorView(authErr);
                }

                Patient.delete(id, (err, patient) => {
                    if (err) {
                        HospitalView.ErrorView(err);
                    } else {
                        HospitalView.deletePatientView(patient);
                    }
                });
            });
        });
    }

    static findPatient(opts, args) {
        if (!opts || !args || !["name", "id"].includes(opts)) {
            HospitalView.ErrorView("Invalid input: option (name or id) and argument are required");
            return;
        }

        Employee.findAll((err, data) => {
            if (err) {
                return HospitalView.ErrorView(err);
            }

            Employee.authorize(data, "doctor", (authErr) => {
                if (authErr) {
                    return HospitalView.ErrorView(authErr);
                }

                Patient.findPatient(opts, args, (err, patient) => {
                    if (err) {
                        HospitalView.ErrorView(err);
                    } else {
                        HospitalView.findPatientView(patient);
                    }
                });
            });
        });
    }

    static show(args) {
        if (!args || !["employee", "patient"].includes(args)) {
            HospitalView.ErrorView("Invalid input: argument is required (employee or patient)");
            return;
        }

        Employee.findAll((err, data) => {
            if (err) {
                return HospitalView.ErrorView(err);
            }

            Employee.authorize(data, args === "patient" ? "doctor" : "admin", authErr => {
                if (authErr) {
                    return HospitalView.ErrorView(authErr);
                }

                if (args === "employee") {
                    HospitalView.showPatientView(data);
                } else {
                    Patient.findAll((err, data) => {
                        if (err) {
                            return HospitalView.ErrorView(err);
                        }
                        HospitalView.showPatientView(data);
                    });
                }
            });
        });
    }
}

module.exports = HospitalController;
