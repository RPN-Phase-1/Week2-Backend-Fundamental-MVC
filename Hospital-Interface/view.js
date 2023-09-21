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
        console.log("Notifikasi ! \n" + err);
    }
    static LoginView(user){
        console.log("Selamat Datang <3 "+ "paduka "+user["username"]+" dengan jabatan "+user["position"])
    }
    static LogoutView(user){
        console.log("Sayonara <3 "+ "paduka "+user["username"]+" dengan jabatan "+user["position"])
    }
    static addPatientView(patient){
        console.log(`save data success {"id ":${patient[0].id},"nama ":${patient[0].nama},"penyakit":${patient[0].penyakit}. Total patient : ${patient[1]}`)
    }
    static updatePatientView(patient){
        console.log(`update data success {"id ":${patient[0].id},"nama ":${patient[0].nama},"penyakit":${patient[0].penyakit}. Total patient : ${patient[1]} } dari data sebelumnya {"id ":${patient[2].id},"nama ":${patient[2].nama},"penyakit":${patient[2].penyakit}`)
    }
    static deletePatientView(patient){
        console.log(`delete data success {"id ":${patient[0].id},"nama ":${patient[0].nama},"penyakit":${patient[0].penyakit}. Total patient : ${patient[1]} } dari data sebelumnya {"id ":${patient[2].id},"nama ":${patient[2].nama},"penyakit":${patient[2].penyakit}`)
    }
    static show(data){
        console.log(data)
    }
    static findPatient(data){
        console.log(data)
    }
}



module.exports = HospitalView;