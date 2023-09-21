var moment = require('moment');
let now = moment().date();
let jam = moment().add(1, 'minute').calendar().split("at")[1]
jam = jam.slice(1,jam.length);
let tanggal = moment().add(1, 'minute').date()
let b = moment()

console.log(jam,tanggal,now)
let i = 0;
