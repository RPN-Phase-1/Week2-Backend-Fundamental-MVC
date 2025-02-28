const moment = require('moment');

function scheduleTask() {
    const futureDate = moment().add(3, 'days').format('LLLL');
    console.log(`Scheduled task for: ${futureDate}`);
}

module.exports = { scheduleTask };