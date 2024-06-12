import process from "process";
import HospitalController from "./controller";
import HospitalView from "./view";

const main = async () => {
  const [_, __, command, ...args] = process.argv;
  try {
    switch (command) {
      case "register": await HospitalController.register(...args); break;
      case "login": await HospitalController.login(...args); break;
      case "logout": await HospitalController.logout(); break;
      default: HospitalController.help(); break;
    }
  } catch (e) {
    if (typeof e === "string") HospitalView.errorView(e);
  }
}

void main();
