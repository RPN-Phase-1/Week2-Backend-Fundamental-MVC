const moment = require("moment");

function scheduleTask(amount = 3, unit = "days") {
  const tasks = moment().add(amount, unit).format("LLL");
  console.log("Scheduled task for:", tasks);
}

module.exports = { scheduleTask };
