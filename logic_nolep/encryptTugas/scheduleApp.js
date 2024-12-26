const moment = require("moment");

function scheduleTask() {
    const task = moment().add(3, "days");

    console.log(`Scheduled task for: ${task}`);
}

module.exports = { scheduleTask };
