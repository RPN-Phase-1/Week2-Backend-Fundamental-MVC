const fs = require("fs").promises;

class Patient {
  constructor(id, name, disease) {
    this.id = id;
    this.name = name;
    this.disease = disease;
  }

  static async addPatient(id, name, disease) {
    try {
      const data = await this.findAll();
      const isExist = data.find((patient) => patient.id === id);

      if (!id || !name || !disease.length) {
        throw new Error("[Addition Failed] ID, name and disease are required");
      }

      if (!isExist) {
        const patient = new Patient(id, name, disease);
        data.push(patient);
        await fs.writeFile("./patient.json", JSON.stringify(data, null, 2));
        return [patient, data.length];
      } else {
        throw new Error("[Addition Failed] This ID is already exists");
      }
    } catch (error) {
      throw error;
    }
  }

  static async updatePatient(id, name, disease) {
    try {
      const data = await this.findAll();
      const patient = data.find((patient) => patient.id === id);

      if (!id || !name || !disease.length) {
        throw new Error("[Update Failed] ID, name and disease are required");
      }

      if (patient) {
        patient.name = name;
        patient.disease = disease;
        await fs.writeFile("./patient.json", JSON.stringify(data, null, 2));
        return patient;
      } else {
        throw new Error(`[Update Failed] Patient with ID: ${id} not found`);
      }
    } catch (error) {
      throw error;
    }
  }

  static async deletePatient(id) {
    try {
      const data = await this.findAll();
      const patient = data.findIndex((patient) => patient.id === id);

      if (!id) {
        throw new Error("[Delete Failed] ID is required");
      }

      if (patient !== -1) {
        data.splice(patient, 1);
        await fs.writeFile("./patient.json", JSON.stringify(data, null, 2));
      } else {
        throw new Error(`[Delete Failed] Patient with ID: ${id} not found`);
      }
    } catch (error) {
      throw error;
    }
  }

  static async findPatientBy(opts, value) {
    try {
      const data = await this.findAll();

      if (!opts || !value) {
        throw new Error("[Search Failed] Invalid options or value");
      } else if (opts === "id") {
        const patient = data.find((patient) => patient.id === value);
        if (patient) {
          return patient;
        } else {
          throw new Error(
            `[Search Failed] Patient with ID: ${value} not found`,
          );
        }
      } else if (opts === "name") {
        const patient = data.find((patient) => patient.name === value);
        if (patient) {
          return patient;
        } else {
          throw new Error(
            `[Search Failed] Patient with Name: "${value}" not found`,
          );
        }
      } else {
        throw new Error("[Search Failed] Invalid options or value");
      }
    } catch (error) {
      throw error;
    }
  }

  static async show(role) {
    try {
      const data = await this.findAll();

      if (role === "DOCTOR") {
        return data;
      } else {
        throw new Error("[Permission Denied] You are not authorized");
      }
    } catch (error) {
      throw error;
    }
  }

  static async findAll() {
    try {
      const data = await fs.readFile("./patient.json", "utf8");
      return JSON.parse(data);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Patient;
