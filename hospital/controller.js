let Patient = require("./patient");
let Employee = require("./employee")
let HospitalView = require("./view");

class HospitalController {
    static register(name, password, role) {
        Employee.register(name, password, role, (err, objArr) => {
            if (err) {
                HospitalView.ErrorView(err);
            } else {
                HospitalView.registerView(objArr);
            }
        });
    }

    // lanjutkan command yang lain
    static login = (username, password) =>{
        Employee.login(username, password, (err, status) =>{
            if(err) {
                HospitalView.ErrorView(err)
            }else{
                HospitalView.loginSuccess(status)
            }
        })
    }

    static logout = () => {
        Employee.logout((status) =>{
            HospitalView.logoutSuccess(status)
        })
    }

    static addPatient = (id, nama, penyakit) => {
        Patient.addPatient(id, nama, penyakit, (err, objArr) => {
            if(err) {
                HospitalView.ErrorView(err)
            } else{
                HospitalView.addPatientView(objArr)
            }
        })
    }

    static updatePatient = (id, nama, penyakit) => {
        Patient.updatePatient(id, nama, penyakit, (err, update) =>{
            if(err) {
                HospitalView.ErrorUpdateView(err)
            }else{
                HospitalView.updateSuccessView(update)
            }
        })
    }

    static deletePatient = (id, nama) => {
        Patient.deletePatient(id,nama, (err,hapus) =>{
            if(err){
                HospitalView.ErrorView(err)
            }else{
                HospitalView.deletePatientView(hapus)
            }
        })
    }

    static showEmployee = () =>{
        Employee.showEmployee((show) => {
            HospitalView.showEmployeeView(show)
        })
    }

    static showPatient = () => {
        Patient.showPatient((show) => {
            HospitalView.showPatientView(show)
        })
    }

    static findPatient =  (id,nama) => {
        Patient.findPatient(id,nama,(err,show) => {
            if(err){
                HospitalView.errorPatientView(err)
            }else{
                HospitalView.showPatientView(show)
            }
        })
    }

    
    static help(){
        HospitalView.helpView()
    }
    
}


module.exports = HospitalController;