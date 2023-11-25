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

    static addPatient(id, name , diseases){
        Employee.findAll((err, obj)=>{
          if(err){
            HospitalView.ErrorView(err)
          }else{
            let isDokter = false
            for (let i = 0; i < obj.length; i++) {
                if(obj[i].login===true && obj[i].position === "dokter"){
                    isDokter = true
                 }
             
                
            } 
                
            if(isDokter){
                Patient.addPatient(id, name, diseases, (err, objArr)=>{
                    if(err){
                        HospitalView.ErrorView(err)
                    }else{
                        HospitalView.addPatient(objArr);
                    }
                                   
                })

            }else{
                HospitalView.ErrorView("u are not doctor")
            }
            
        
        
          }
            
        })
             
        
    }

    static updatePatient(id, name, diseases){

        Employee.findAll((err, obj)=>{
            if(err){
                HospitalView.ErrorView(err)
            }else{
                let isDokter = false
            for (let i = 0; i < obj.length; i++) {
                if(obj[i].login===true && obj[i].position === "dokter"){
                    isDokter = true
                 }
             
                
            } 
                
            if(isDokter){
                Patient.updatePatient(id, name, diseases, (err, objArr)=>{
                    if(err){
                        HospitalView.ErrorView(err)
                    }else{
                        HospitalView.updatePatient(objArr);
                    }
                                   
                })

            }else{
                HospitalView.ErrorView("u are not doctor")
            }
            
            }
        })
       
    }

    static deletePatient(id){
        Employee.findAll((err,obj)=>{
            if(err){
                HospitalView.ErrorView(err)
            }else{
                let isDokter = false
                for (let i = 0; i < obj.length; i++) {
                    if(obj[i].login===true && obj[i].position === "dokter"){
                        isDokter = true
                     }
                 
                    
                } 
                if(isDokter){
                    Patient.deletePatient(id, (err, objArr)=>{
                        if(err){
                            HospitalView.ErrorView(err)
                        }else{
                            HospitalView.deletePatient(id);
                        }
                                       
                    })
    
                }else{
                    HospitalView.ErrorView("u are not doctor")
                }

            }
        })
    }



    static help(){
        
        HospitalView.helpView()
       
    }

    // lanjutkan command yang lain
}


module.exports = HospitalController;