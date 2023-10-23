import fs from 'fs'
import path from "path";

const dbDir = "/Users/yukenz/WebstormProjects/Week2-Backend-Fundamental-MVC/src/mvc/db"
const employeeDB = path.resolve(dbDir, "employee.json")
const patientDB = path.resolve(dbDir, "patient.json")

class EmployeeRepository {

    static findById(id) {
        return JSONDBC.read(employeeDB)
            .filter(employee => employee.id === id)[0]
    }

    static save(employee) {

        const employees = JSONDBC.read(employeeDB)
        employees.push(employee)

        return JSONDBC.write(employeeDB, employee)
    }

    static delete(id) {
        return JSONDBC.write(
            employeeDB,
            JSONDBC.read(employeeDB).filter(employee => employee.id !== id)
        )
    }

    static findAll() {
        return JSON.parse(fs.readFileSync(employeeDB).toString())
    }

}

class PatientRepository {
    static findById(id) {
        return JSONDBC.read(patientDB)
            .filter(employee => employee.id === id)[0]
    }

    static save(employee) {

        const employees = JSONDBC.read(patientDB)
        employees.push(employee)

        return JSONDBC.write(patientDB, employee)
    }

    static delete(id) {
        return JSONDBC.write(
            patientDB,
            JSONDBC.read(patientDB).filter(employee => employee.id !== id)
        )
    }

    static findAll() {
        return JSON.parse(fs.readFileSync(patientDB).toString())
    }
}

class JSONDBC {

    static read(filePath) {
        return JSON.parse(fs.readFileSync(filePath).toString())
    }

    static write(filePath, obj) {
        fs.writeFileSync(filePath, JSON.stringify(obj), "utf-8")
        return true
    }

}

export {EmployeeRepository, PatientRepository}