class HospitalView {
    static helpView() {
        console.log(`==========================
HOSPITAL INTERFACE COMMAND
==========================
node index.js register <username> <password> <jabatan>
node index.js login <username> <password>
node index.js addPatient <id> <namaPasien> <penyakit1> <penyakit2> ....
node index.js updatePatient <id> <namaPasien> <penyakit1> <penyakit2> ....
node index.js deletePatient <id>
node index.js logout
node index.js show <employee/patient>
node index.js findPatientBy: <name/id> <namePatient/idPatient>`);
    }

    static ErrorView(err) {
        if (err instanceof Error) {
            console.error(`Error: ${err.message}.`);
        } else {
            console.error(`Error: ${err}.`);
        }
    }

    static registerView(objArr) {
        console.log(`save data success {"username":${objArr[0].username},"password":${objArr[0].password},"role":${objArr[0].position}}. Total employee : ${objArr[1]}.`);
    }

    static loginView(employee) {
        console.log(`${employee.username} successfully logged in.`);
    }

    static logoutView(employee) {
        console.log(`${employee.username} logged out successfully.`);
    }

    static addPatientView(patient) {
        console.log(`Patient added successfully {"id":${patient.id},"name":${patient.name},"diseases":${patient.diseases}}.`);
    }

    static updatePatientView(patient) {
        console.log(`Patient updated successfully {"id":${patient.id},"name":${patient.name},"diseases":${patient.diseases}}.`);
    }

    static deletePatientView(patient) {
        console.log(`Patient with id:${patient.id} (${patient.name}) was successfully deleted.`);
    }

    static findPatientView(patient) {
        console.log(`Patient found id:${patient.id} name:${patient.name} diseases:${patient.diseases}.`);
    }

    static showEmployeeView(employee) {
        console.table(employee);
    }

    static showPatientView(patient) {
        console.table(patient);
    }
}

module.exports = HospitalView;
