var moment = require('moment'); // require
const input = process.argv[2];
const dateTime = moment();
const newDateTime = moment('24-12-2019-09:15:10', "DD-MM-YYYY-hh:mm:ss", true);
//console.log(dateTime, newDateTime)

module.exports = {dateTime};