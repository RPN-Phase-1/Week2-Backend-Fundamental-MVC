//let Patient = require("./patient");
let Employee = require("./employee")
let HospitalView = require("./view");
let {keteranganHelp} = require("./string")

class HospitalController {
    static register(name, password, role) {
        Employee.register(name, password, role, (err, objArr) => {
            if (err) {
                HospitalView.ErrorView(err);
            } else {
                // console.log(objArr)
                // // console.log("yey")
                HospitalView.registerView(objArr);
            }
        });
    }
    static login(username, password){
        Employee.login(username,password,(err,result)=>{
            if(err){
                HospitalView.ErrorView(err);
            }else{
                HospitalView.LoginView(result);
            }
        })
    }

    static logout(){
        Employee.logout((err,result)=>{
            if(err){
                HospitalView.ErrorView(err);
            }else{
                HospitalView.LogoutView(result);
            }
        })
    }



    static help(){
        HospitalView.helpView(keteranganHelp)
    }

    // lanjutkan command yang lain
}


module.exports = HospitalController;