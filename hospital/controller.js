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
    static login(name, password){
        Employee.isLogin((err,info) =>{
            if (err) {
                HospitalView.ErrorView(err);
            } else {
                if(info.login){
                    HospitalView.ErrorView("Anda sudah login, jika ingin mengganti akun silakan logout dahulu");
                } else {
                    Employee.login(name,password,(err,dataUser) =>{
                        if (err) {
                            HospitalView.ErrorView(err);
                        } else {
                            HospitalView.loginView(dataUser);
                        }
                    })
                }
            }
        })
    }
    static logout (){
        Employee.isLogin((err,info) => {
            if (err) {
                HospitalView.ErrorView(err);
            } else {
                // console.log(info)
                if(info.login==false){
                    HospitalView.helpView(0);
                } else {
                    Employee.logout((err,data)=>{
                        if (err) {
                            HospitalView.ErrorView(err);
                        } else {
                            HospitalView.helpView(0);
                        }
                    })
                }
            }
        })
    }
    static help (){
        Employee.isLogin((err,info) => {
            if (err) {
                HospitalView.ErrorView(err);
            } else {
                // console.log(info)
                if(info.login==false){
                    HospitalView.helpView(0);
                } else if(info.role == "dokter"){
                    HospitalView.helpView(1);
                } else if(info.role == "admin"){
                    HospitalView.helpView(2);
                }
            }
        })
    }
    // lanjutkan command yang lain
}


module.exports = HospitalController;