let command = process.argv[2];
let argument = process.argv.slice(3);
let HospitalController = require("./controller");

switch (command) {
    case "register":
        HospitalController.register(argument[0], argument[1], argument[2]);
        break;
    
    // buatlah semua command

    case "login":
        HospitalController.login(argument[0],argument[1]);
        break;
    case "logout":
        HospitalController.logout();
        break;
    default:
        HospitalController.help();
        break;
}