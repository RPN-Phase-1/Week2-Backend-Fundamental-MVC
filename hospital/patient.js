let fs = require("fs");

class Patient {
  constructor(id, name, diseases) {
    this.id = id
    this.name = name
    this.diseases = diseases
  
  }

  
  // lanjutkan method lain

  static findAll(cb) {
    fs.readFile("./patient.json", "utf8", (err, data) => {
      if (err) {
        cb(err)
      } else {
        cb(err, JSON.parse(data));
      }
    })
  }

  static addPatient(id, name, diseases, cb){
    this.findAll((err, data)=>{
      if(err){
        cb(err, null)
      }else{

        let obj = new Patient(id, name, diseases)
        let newData = data;
        newData.push(obj);
        let objArr = [];

        objArr.push(obj);
        objArr.push(newData.length);


        fs.writeFile("./patient.json", JSON.stringify(newData), (err) => {
          if (err) {
            console.log(err);
          } else {
            cb(err, objArr);
          }
        })


      }
    })
  }
 

}



module.exports = Patient;