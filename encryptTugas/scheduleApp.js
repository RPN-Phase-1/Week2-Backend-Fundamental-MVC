const moment = require("moment");


function scheduleTask() {
  //code
  const myMoment = moment("2023-08-31").endOf("day").fromNow();
  const schedule = moment().add(10, "days").calendar();
  console.log("Scheduled task for: " + schedule);
}

module.exports = { scheduleTask };
