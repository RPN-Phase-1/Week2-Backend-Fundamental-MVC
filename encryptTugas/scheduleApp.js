const moment = require('moment');

function scheduleTask() {
  //code

  const scheduleDate = moment().add(3, 'day').format('YYYY-MMMM-DD (HH:mm)')
  return scheduleDate
}

// const testDate = scheduleTask()
// console.log(testDate)


module.exports = { scheduleTask };