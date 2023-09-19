var moment = require('moment'); // require
const newDateTime = moment('24-12-2019-09:15:10', "DD-MM-YYYY-hh:mm:ss", true);

const getTime = ()=>{
    let all = moment().calendar();
    let jam = moment().calendar().split("at")[1];
    jam = jam.slice(1,jam.length);
    let tanggal = moment().date();
    return {"jam" : jam, "tanggal" : tanggal, "all" : all,}
}

const addDay = (day)=>{
    let all = moment().add(day, 'day').calendar()
    let jam = moment().add(day, 'day').calendar().split("at")[1]
    jam = jam.slice(1,jam.length);
    let tanggal = moment().add(day, 'day').date()
    return {"jam" : jam, "tanggal" : tanggal, "all" : all,}
}
const addHour = (hour)=>{
    let all = moment().add(hour, 'hour').calendar()
    let jam = moment().add(hour, 'hour').calendar().split("at")[1]
    jam = jam.slice(1,jam.length);
    let tanggal = moment().add(hour, 'hour').date() 
    return {"jam" : jam, "tanggal" : tanggal, "all" : all,}
}
const addMinutes = (minutes)=>{
    let all = moment().add(minutes, 'minute').calendar()
    let jam = moment().add(minutes, 'minute').calendar().split("at")[1]
    jam = jam.slice(1,jam.length);
    let tanggal = moment().add(minutes, 'minute').date() 
    return {"jam" : jam, "tanggal" : tanggal, "all" : all,}
}
    
module.exports = {getTime,addDay,addHour,addMinutes};