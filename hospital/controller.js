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

    static login(username, password){
        Employee.login(username, password, (err) => {
            if(err){
                HospitalView.ErrorView(err)
            }else{
                HospitalView.loginView(username,password)
            }
        })
    }

    static logout(){
        Employee.logout((err, data)=>{
            if(err){
                HospitalView.ErrorView(err)
            }else{
                HospitalView.logoutView(data)
            }
        })
    }
    static help(){
        
        HospitalView.helpView()
       
    }

    // lanjutkan command yang lain
}


module.exports = HospitalController;