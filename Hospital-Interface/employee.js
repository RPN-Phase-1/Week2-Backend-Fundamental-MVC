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
            //cek session login
            let sessionLogin = dataUser.find(e=>{
                if(e["login"] == true){
                    return e
                }
            })
            
            if(sessionLogin){
                if(sessionLogin["username"] == username){
                    return cb("anda belum logout masih dalam session login dengan username " + username)
                }else{
                    return cb("session login terdeteksi. mohon logout dulu. akun yang ada gunakan sekarang adalah akun dengan username " + sessionLogin["username"])
                }
            }
            
            let indexUser;
            for (let i = 0; i < dataUser.length; i++) {
                const user = dataUser[i];
                if(user["username"] == username && user["password"] == password){
                    indexUser = i;
                }
            }
            
            //username password salah
            if(!indexUser){
                return cb("username atau password salah")
            }

            //ubah statuslogin / berikan seassion login
            dataUser[indexUser]["login"] = true;
            this.writeEmployee(dataUser,(err,result)=>{
                if(err){
                    return cb(err);
                }
                cb(err,result[indexUser])
            })
                     


        }
    })
  }

  static logout(cb){
    this.findAll((err,result)=>{
        let dataUser = result;
        if(err){
            return cb(err)
        }
        let userLoginIndex;
        for (let i = 0; i < result.length; i++) {
            const user = result[i];
            if(user["login"] == true){
                userLoginIndex = i;
            }
        }
        if(!userLoginIndex){
            return cb("anda belum login.")
        }
        dataUser[userLoginIndex]["login"] = false
        this.writeEmployee(dataUser,(err,result)=>{
            if(err){
                return cb(err);
            }
            cb(err,result[userLoginIndex])
        })


  })}

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

static writeEmployee(data,cb){
    fs.writeFile("./employee.json",JSON.stringify(data),"utf-8",(err)=>{
        if(err){
            return cb(err);
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