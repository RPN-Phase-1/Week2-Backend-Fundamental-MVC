let fs = require("fs");

class Patient {
  constructor(id, name, diseases) {
    this.id = id
    this.name = name
    this.diseases = diseases
  }

  static addPatient(id, name, diseases) {
    return new Promise((resolve, reject) => {
      this.findAll((err, data) => {
        if (err) {
          console.log(err);
        } else {
          let obj = new Patient(id, name, diseases)
          let newData = data;
          newData.push(obj);
          let objArr = [];
  
          objArr.push(obj);
          objArr.push(newData.length);
          fs.writeFile("./patient.json", JSON.stringify(newData), (err) => {
            if (err) {
              reject(err);
            } else {
              resolve(objArr);
            }
          })
        }
      });
    })
  }

  static updatePatient(id, name, diseases) {
    return new Promise((resolve, reject) => {
      this.findAll((err, data) => {
        if (err) {
          console.log(err);
        } else {
          let newData = data;
          let obj = new Patient(id, name, diseases)
          data.forEach((patient, i) => {
            if (patient.id === id) {
              newData.splice(i,1,obj)  
              return
            }
          })
          fs.writeFile("./patient.json", JSON.stringify(newData), (err) => {
            if (err) {
              reject(err);
            } else {
              resolve(obj);
            }
          })
        }
      });
    })
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
 

}



module.exports = Patient;