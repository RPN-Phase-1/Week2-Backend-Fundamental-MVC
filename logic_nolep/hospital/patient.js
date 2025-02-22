const fs = require("fs");

class Patient {
    constructor(id, name, diseases) {
        this.id = id;
        this.name = name;
        this.diseases = diseases; // Array of diseases
    }

    static findAll(cb) {
        fs.readFile("./patient.json", "utf8", (err, data) => {
            if (err) {
                cb(err);
            } else {
                cb(null, JSON.parse(data));
            }
        });
    }

    static addPatient(id, name, diseases, cb) {
        this.findAll((err, patients) => {
            if (err) {
                cb(err);
            } else {
                let newPatient = new Patient(id, name, diseases);
                patients.push(newPatient);

                fs.writeFile("./patient.json", JSON.stringify(patients, null, 2), (err) => {
                    if (err) {
                        cb(err);
                    } else {
                        cb(null, newPatient);
                    }
                });
            }
        });
    }

    static updatePatient(id, name, diseases, cb) {
        this.findAll((err, patients) => {
            if (err) {
                cb(err);
            } else {
                let index = patients.findIndex(patient => patient.id == id);
                if (index !== -1) {
                    patients[index].name = name;
                    patients[index].diseases = diseases;

                    fs.writeFile("./patient.json", JSON.stringify(patients, null, 2), (err) => {
                        if (err) {
                            cb(err);
                        } else {
                            cb(null, patients[index]);
                        }
                    });
                } else {
                    cb(new Error("Patient not found!"));
                }
            }
        });
    }

    static deletePatient(id, cb) {
        this.findAll((err, patients) => {
            if (err) {
                cb(err);
            } else {
                let filteredPatients = patients.filter(patient => patient.id != id);
                if (filteredPatients.length === patients.length) {
                    cb(new Error("Patient not found!"));
                } else {
                    fs.writeFile("./patient.json", JSON.stringify(filteredPatients, null, 2), (err) => {
                        if (err) {
                            cb(err);
                        } else {
                            cb(null, `Patient with ID ${id} deleted successfully.`);
                        }
                    });
                }
            }
        });
    }
}

module.exports = Patient;
