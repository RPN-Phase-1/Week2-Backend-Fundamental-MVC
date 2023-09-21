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
  
  static updatePatient(argument,cb){
    Employee.findAll((err,result)=>{
        let allUser = result;
        let indexLoginUser;
        if(err){
            return cb(err);
        }
        for (let i = 0; i < allUser.length; i++) {
            if(allUser[i]["login"] == true){
                if(allUser[i].position != "dokter"){
                    return cb("akun yang sedang login saat ini bukanlah dokter melainkan admin. silahkan logout kemudian login sebagai dokter.")
                }
                indexLoginUser = [i];
                break
            }
        }
        if(!indexLoginUser){
            return cb("Silahkan login terlebih dahulu sebagai dokter")
        }

        //tambahkan patient ke patien.json
        this.findAllPatient((err,result)=>{
            if(err){
                return cb(err);
            }
            let dataPatient = result;
            //cekid apakah ada id tersebut
            let cekId;
            for (let i = 0; i < dataPatient.length; i++) {
                if(dataPatient[i].id == argument[0])
                {
                    cekId = i
                }
            }
            if(!cekId){
                return cb("Id "+argument[0] + " id patient tidak ditemukan")
            }
            let dataLamaPatient = dataPatient[cekId]
            const patient = {"id":argument[0],"nama":argument[1],"penyakit":argument.slice(2,argument.length)}
            dataPatient[cekId] = patient
            this.writePatient(dataPatient,(err,result)=>{
                if(err){
                    return cb("error write data json patient " + err)
                }
                let data = [patient,result.length,dataLamaPatient]
                return cb(err,data);
            })


        })

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



  static findPatient(by,data,cb){
    Employee.findAll((err,result)=>{
        let allUser = result;
        let indexLoginUser;
        if(by == "name"){
            by = "nama"
        }
        if(err){
            return cb(err);
        }
        for (let i = 0; i < allUser.length; i++) {
            if(allUser[i]["login"] == true){
                if(allUser[i].position != "dokter"){
                    return cb("akun yang sedang login saat ini bukanlah dokter melainkan admin. silahkan logout kemudian login sebagai dokter.")
                }
                indexLoginUser = [i];
                break
            }
        }
        if(!indexLoginUser){
            return cb("Silahkan login terlebih dahulu sebagai dokter")
        }

        //temukan data patient
        this.findAllPatient((err,result)=>{
            if(err){
                return cb(err);
            }
            let dataPatient = result;
            
            if(!(by == "id" || by == "nama")){
                return cb("sintax salah baca panduan yang teliti ! error at '" + by +"'");
            }
            let patient = []
            dataPatient.find((e)=>{
                //console.log(e)
                if(e[by] == data){
                    patient.push(e)
                }
            })
            //console.log(patient)

            return cb(err,patient);
        })

    })
  }

  static show(argument,cb){
    Employee.findAll((err,result)=>{
        let allUser = result;
        let indexLoginUser;
        let verifikasiJabatan;
        if(err){
            return cb(err);
        }
        for (let i = 0; i < allUser.length; i++) {
            if(allUser[i]["login"] == true){
                let position = allUser[i]["position"];
                indexLoginUser = i;
                if(argument == "patient" && position == "dokter" || argument == "employee" && position == "admin" ){
                    verifikasiJabatan = position;
                }
                
                indexLoginUser = [i];
                break
            }
        }
        if(!indexLoginUser){
            return cb("anda belum login")
        }
        if(!verifikasiJabatan){
            if(argument == "employee"){
                return cb("Kamu bukan admin")
            }else if(argument == "patient"){
                return cb("kamu bukan dokter")
            }else{
                return cb("Argument show <patient/employee> yang kamu masukan salah")
            }
        }
        
        //show
        if(verifikasiJabatan == "dokter"){
            this.findAllPatient((err,result)=>{
                if(err){
                    return cb("erorr mengambil data patient")
                }
                return cb(err,result);
            })
        }else{
            this.findAll((err,result)=>{
                if(err){
                    return cb("error mengambil data employee")
                }
                return cb(err,result);
            })
        }
        

    })
  }

  static addPatient(argument,cb){
    Employee.findAll((err,result)=>{
        let allUser = result;
        let indexLoginUser;
        if(err){
            return cb(err);
        }
        for (let i = 0; i < allUser.length; i++) {
            if(allUser[i]["login"] == true){
                if(allUser[i].position != "dokter"){
                    return cb("akun yang sedang login saat ini bukanlah dokter melainkan admin. silahkan logout kemudian login sebagai dokter.")
                }
                indexLoginUser = [i];
                break
            }
        }
        if(!indexLoginUser){
            return cb("Silahkan login terlebih dahulu sebagai dokter")
        }

        //tambahkan patient ke patien.json
        this.findAllPatient((err,result)=>{
            if(err){
                return cb(err);
            }
            let dataPatient = result;
            //cekid apakah sudah digunakan ?
            let cekId;
            dataPatient.find((e)=>{
                if(e["id"]==argument[0]){
                    cekId = true;
                }
            })
            if(cekId){
                return cb("Id "+argument[0] + " patient telah digunakan")
            }
            const patient = {"id":argument[0],"nama":argument[1],"penyakit":argument.slice(2,argument.length)}
            dataPatient.push(patient);
            this.writePatient(dataPatient,(err,result)=>{
                if(err){
                    return cb("error write data json patient " + err)
                }
                let data = [patient,result.length]
                return cb(err,data);
            })


        })

    })
  }

  static deletePatient(argument,cb){
    Employee.findAll((err,result)=>{
        let allUser = result;
        let indexLoginUser;
        if(err){
            return cb(err);
        }
        for (let i = 0; i < allUser.length; i++) {
            if(allUser[i]["login"] == true){
                if(allUser[i].position != "dokter"){
                    return cb("akun yang sedang login saat ini bukanlah dokter melainkan admin. silahkan logout kemudian login sebagai dokter.")
                }
                indexLoginUser = [i];
                break
            }
        }
        if(!indexLoginUser){
            return cb("Silahkan login terlebih dahulu sebagai dokter")
        }

        //tambahkan patient ke patien.json
        this.findAllPatient((err,result)=>{
            if(err){
                return cb(err);
            }
            let dataPatient = result;
            //cekid apakah ada id tersebut
            let cekId;
            let cekIdIndex;
          
            for (let i = 0; i < dataPatient.length; i++) {
                if(dataPatient[i].id == argument[0] && dataPatient[i].nama == argument[1])
                {
                    cekId = i
                    //cek penyakitnya sama apa tidak
                    let penyakitPasient = dataPatient[i].penyakit
                    let penyakitInput = argument.slice(2,argument.length)
                    for (let j = 0; j < penyakitPasient.length; j++) {
                        const penyakit = penyakitPasient[j];
                        const input = penyakitInput[j]
                        if(penyakit != input){
                            return cb("gagal penyakit tidak susai dengan data yang ada data : " + `data penyakit [${penyakitPasient[j]}] data input [${penyakitInput[j]}]`)
                        }
                    }
                }
            }

            if(cekId == undefined){
                return cb("Id "+argument[0] + " gagal id dengan nama patient tidak sesuai")
            }
            let dataLamaPatient = dataPatient[cekId]
            dataPatient.splice(cekId,1)

            this.writePatient(dataPatient,(err,result)=>{
                if(err){
                    return cb("error write data json patient " + err)
                }
                let data = [[],result.length,dataLamaPatient]
                return cb(err,data);
            })


        })

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

static writeEmployee(data,cb)
{
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
  static findAllPatient(cb) {
    fs.readFile("./patient.json", "utf8", (err, data) => {
      if (err) {
        cb(err)
      } else {
        cb(err, JSON.parse(data));
      }
    })
  }

  static writePatient(data,cb){
    fs.writeFile("./patient.json",JSON.stringify(data),"utf-8",(err)=>{
        if(err){
            return cb(err);
        }
        cb(err,data);
    })
  }
 

}




module.exports = Employee;