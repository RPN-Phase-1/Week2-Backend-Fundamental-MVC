let fs = require("fs");

class Employee {
  constructor(username, password, position) {
    this.username = username
    this.password = password
    this.position = position
    this.login = false;
  }
  static login (username,password,cb){
    this.findAll((err,result)=>{
        if(err){
            cb(err)
        }else{
            let dataUser = result;
            let user = dataUser.find((e)=>{
                if(e["username"]==username && e["password"]==password){
                    return e;
                }
            })
            
            if(!user){
               return cb("Username atau password salah");
            }

            user["login"] = true;
            return cb(err,user);


        }
    })
  }

  static register(name, password, role, cb) {
    //cb(true,"a");
    //cb(false,"b");
    
    this.findAll((err,data)=>{
     if(err){
        cb(err);
        return
     }
     const employee = new Employee(name, password,role);
     const usernameTidakTersedia = data.find((e)=>{
        const username = e["username"];
        const newUsername = employee["username"];
        if(username == newUsername){
            return true
        }
     })
     if(usernameTidakTersedia){
        return cb("username Telah digunakan silahkan gunakan username lain")
     }

     //jika username tersedia
     data.push({"username":employee["username"],"password":employee["password"],"position":employee["position"],"login":employee["login"]});
     //console.log(data)
     this.addUser(data,(err,data)=>{
        if(err){
            cb(err);
            return
        }else{
            cb(err,data)
            return
        }

    })
    })
    
}

// lanjutkan method lain
static addUser(data,cb){
    //return cb(false,JSON.stringify(data))
    //return
    fs.writeFile("./employee.json",JSON.stringify(data),"utf-8",(err)=>{
        if(err){
            cb(err);
            return
        }
        cb(err,data);
    })
}


  static findAll(cb) {
    fs.readFile("./employee.json", "utf8", (err, data) => {
      if (err) {
        cb(err)
      } else {
        cb(err, JSON.parse(data));
      }
    })
  }
 

}



module.exports = Employee;