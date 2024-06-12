import { readFile, writeFile } from "fs/promises";

export default class Patient {
  public constructor(public name: string, public symptomps: string[]) {}

  public static async addPatient(name: string, symptomps: string[]) {
    const patients = await Patient.findAll();
    const patient = new Patient(name, symptomps);
    patients.push(patient);
    await Patient.writeFile(patients);
    return patient;
  }

  public static async findAll() {
    let data: any = [];
    try {
      data = JSON.parse(await readFile("./patient.json").then(f =>f.toString()));
    } catch {}
    return data as Patient[];
  }

  public static async writeFile(data: Patient[]) {
    return await writeFile("./package.json", JSON.stringify(data, null, 2));
  }
}
