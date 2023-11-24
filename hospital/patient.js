let fs = require("fs");

class Patient {
  constructor(username, password, diseases) {
    this.username = username
    this.password = password
    this.diseases = diseases
    this.login = false;
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