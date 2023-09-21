function callback (tes) {
    console.log(tes)
}

function hudza (a,callback){
    console.log(a)
    callback("b")
   
}

hudza("a",callback)