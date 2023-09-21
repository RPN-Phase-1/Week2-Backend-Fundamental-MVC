class HospitalView {
    static registerView(objArr) {
        //console.log(objArr)
        const lastRegistAccount = [objArr[objArr.length-1],objArr.length];

        console.log(`save data success {"username":${lastRegistAccount[0].username},"password":${lastRegistAccount[0].password},"role":${lastRegistAccount[0].position}. Total employee : ${lastRegistAccount[1]}`)
    }
    
    // lanjutkan method lain
    static helpView(keteranganHelp){
        console.log(keteranganHelp);
    }

    static ErrorView(err){
        console.log("waduh error bang " + err);
    }
}


module.exports = HospitalView;