import process from "process";
import HospitalController from "./controller";
import HospitalView from "./view";

function main() {
  const [_, __, command, ...args] = process.argv;
  try {
    switch (command) {
      case "register": HospitalController.register(...args); break;
      case "login": HospitalController.login(...args); break;
      case "logout": HospitalController.logout(); break;
      default: HospitalController.help(); break;
    }
  } catch (e) {
    if (typeof e === "string") HospitalView.errorView(e);
  }
}

main();
