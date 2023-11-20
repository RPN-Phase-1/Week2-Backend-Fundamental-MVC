const moment = require('moment');

function scheduleTask() {
  //code
  let dday = moment().add(3, 'd').format('DD/MM/YYYY')
  console.log(`Scheduled task for: ... ${dday}`)
}

module.exports = { scheduleTask };

