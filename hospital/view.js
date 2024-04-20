class HospitalView {
  static registerView(employee) {
    console.log(
      `Employee Registered\n{"username":${employee[0].username},"password":${employee[0].password},"role":${employee[0].position}}. Total employee: ${employee[1]}`,
    );
  }

  static loginView(employee) {
    console.log(
      `Welcome Back, (${employee.position}) ${employee.username}!\nYou have successfully logged in.`,
    );
  }

  static logoutView(employee) {
    console.log(
      `Goodbye, (${employee.position}) ${employee.username}!\nYou have successfully logged out.`,
    );
  }

  static addPatientView(patient) {
    console.log(
      `Patient Added\n{"id":${patient[0].id},"name":${patient[0].name},"disease":[${patient[0].disease}]}. Total patient: ${patient[1]}`,
    );
  }

  static updatePatientView(patient) {
    console.log(
      `Patient Updated\n{"id":${patient.id},"name":${patient.name},"disease":[${patient.disease}]}.`,
    );
  }

  static deletePatientView(id) {
    console.log(`Patient Deleted\nPatient with ID: ${id} has been deleted.`);
  }

  static findPatientView(patient) {
    console.log(
      `Patient Found\nID: ${patient.id}\nName: "${patient.name}"\nDisease: [${patient.disease}]`,
    );
  }

  static showView(data) {
    console.table(data);
  }

  static errorView(error) {
    console.error(`Something Went Wrong\n${error}.`);
  }

  static helpView() {
    console.log(`
==========================
HOSPITAL INTERFACE COMMAND
==========================

> node index.js [command] [...args]

> node index.js register <username> <password> <role>
> node index.js login <username> <password>
> node index.js addPatient <id> <patientName> <disease1> <disease2> ....
> node index.js updatePatient <id> <patientName> <disease1> <disease2> ....
> node index.js deletePatient <id>
> node index.js logout
> node index.js show <employee/patient>
> node index.js findPatientBy <id/name> <id/patientName>
`);
  }
}

module.exports = HospitalView;
