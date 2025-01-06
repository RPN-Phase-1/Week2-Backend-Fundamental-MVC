let fs = require("fs");

class Patient {
    constructor(id, name, diseases) {
        this.id = id;
        this.name = name;
        this.diseases = diseases;
    }

    static add(id, name, diseases, cb) {
        this.findAll((err, data) => {
            if (err) {
                return cb(err);
            }

            const patient = this.findOne(data, id);
            if (patient) {
                return cb(`Patient with id:${patient.id} (${patient.name}) is already exists`);
            }

            const newPatient = new Patient(id, name, diseases);
            data.push(newPatient);

            this.writeData(data, writeErr => {
                if (writeErr) {
                    return cb(writeErr);
                }
                cb(null, newPatient);
            });
        });
    }

    static update(id, name, diseases, cb) {
        this.findAll((err, data) => {
            if (err) {
                return cb(err);
            }

            const patient = this.findOne(data, id);
            if (!patient) {
                return cb(`Patient with id:${args} not found`);
            }

            patient.name = name;
            patient.diseases = diseases;

            this.writeData(data, writeErr => {
                if (writeErr) {
                    return cb(writeErr);
                }
                cb(null, patient);
            });
        });
    }

    static delete(id, cb) {
        this.findAll((err, data) => {
            if (err) {
                return cb(err);
            }

            const patient = this.findOne(data, id);
            if (!patient) {
                return cb(`Patient with id:${args} not found`);
            }

            const updatedPatient = data.filter((p) => p.id !== patient.id);

            this.writeData(updatedPatient, writeErr => {
                if (writeErr) {
                    return cb(writeErr);
                }
                cb(null, patient);
            });
        });
    }

    static findPatient(opts, args, cb) {
        this.findAll((err, data) => {
            if (err) {
                return cb(err);
            }

            if (opts === "name") {
                const patientName = data.find((patient) => patient.name === args);
                if (!patientName) {
                    return cb(`Patient with name:${args} not found`);
                }
                cb(err, patientName);
            } else {
                const patientId = this.findOne(data, args);
                if (!patientId) {
                    return cb(`Patient with id:${args} not found`);
                }
                cb(err, patientId);
            }
        });
    }

    static findOne(data, id) {
        return data.find((patient) => patient.id === id);
    }

    static findAll(cb) {
        fs.readFile("./patient.json", "utf8", (err, data) => {
            if (err) {
                cb(err);
            }
            cb(err, JSON.parse(data));
        });
    }

    static writeData(data, cb) {
        fs.writeFile("./patient.json", JSON.stringify(data, null, 2), (err) => {
            if (err) {
                return cb(err);
            }
            cb(null);
        });
    }
}

module.exports = Patient;
