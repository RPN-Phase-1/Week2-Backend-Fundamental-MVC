import {test, expect, beforeEach, afterEach} from '@jest/globals'
import {EmployeeRepository, PatientRepository} from "../src/mvc/model";


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