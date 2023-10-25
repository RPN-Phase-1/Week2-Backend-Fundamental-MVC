import {test, expect, beforeEach, afterEach} from '@jest/globals'
import {employeeDB, EmployeeRepository, PatientRepository} from "../src/mvc/model";
import {
    register,
    login,
    logout,
    show,
    findPatientBy,
    addPatient,
    updatePatient,
    deletePatient
} from "../src/mvc/controller";
import {isStringFieldValid} from '../src/utils/ValidationUtils'
import fs from "fs";
import {SessionDriver} from "../src/utils/SessionDriver";


test("ModelTest", function () {

    //Get first and add
    const dbFirstState = PatientRepository.findAll();
    console.log(dbFirstState)
    dbFirstState.push({name: 'harkon', id: 2})
    PatientRepository.save(dbFirstState)

    //get second and delete
    const dbSecondState = PatientRepository.findAll();
    console.log(dbSecondState)
    PatientRepository.delete(2)

    //get third and delete
    const dbThirdState = PatientRepository.findAll();
    console.log(dbThirdState)

    console.log(PatientRepository.findById(1))
});

test("validateTestField", () => {

    expect(isStringFieldValid("awan")).toBeTruthy()
    expect(isStringFieldValid("awan123")).toBeTruthy()
    expect(isStringFieldValid("123", "")).toBeFalsy()
    expect(isStringFieldValid("")).toBeFalsy()
    expect(isStringFieldValid(null)).toBeFalsy()
    expect(isStringFieldValid(undefined)).toBeFalsy()

});

test("registerEmployee", () => {


    //Kosongin DB
    employeeDB.flush()

    //Test Register
    console.log(register("", "dawd", "doctor"))
    console.log(register("yukenz", "dawd", "doctor"))
    console.log(register("yukenz", "dawd", "doctors"))
    console.log(register("yukenz", "dawd", "doctor"))

    console.log(register("shin", "dawd", "doctor"))


    console.log(register("harkon", "dawd", "nurse"))
    console.log(register("wei", "dawd", "nurse"))


})

test("loginLogoutEmployee", () => {

    console.log(logout())
    console.log(login("yukenz", "dawd"))

})

test("listWarga", () => {

    console.log(show("employee"))
    console.log(show("patient"))
    console.log(show("sepuh"))

})

test("sessionMather", () => {

    const sessionDriver = new SessionDriver();

    console.log(sessionDriver.match("username", "yukenz"))
    //work

})

test("findPatientOnlyForDocktor", () => {


    console.log(new SessionDriver().read())
    console.log(findPatientBy("name", "wei"));

})

test("add patient", () => {

    console.log(addPatient(55, "harkon", "mabok", "mutah"));
    console.log(addPatient(51, "awan", "mabok", "mutah"));

})

test("uppdate patient", () => {

    console.log(updatePatient(55, "harkon", "pusing", "mual"));//ada
    // console.log(updatePatient(55, "harksn", "pusing", "musal"));//ada
    console.log(updatePatient(54, "harkon", "pusing", "mual"));//id gakada


})

test("delete patient", () => {

    console.log(deletePatient(55))//ada
    console.log(deletePatient(54))//gakada


})