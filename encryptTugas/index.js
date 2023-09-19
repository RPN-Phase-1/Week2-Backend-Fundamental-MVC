//app schejule encripsi
//hudzaifah assyahid /@kentung
//muhammadhudzaifahassyahid5@gmail.com
const {encrypt,decryp} = require("./cryptoApp");
const {getTime,addDay,addHour,addMinutes} = require("./scheduleApp");
const fs = require('fs');

//main
mainMenu();

function mainMenu() {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout,
      });
    let pertanyaan = `
    Selamat datang apa yang akan anda lakukan ?
    1. Enkripsi File.
    2. Dekripsi File.
    3. Membuka (Dekripsi) file dengan timer waktu tertentu.
    `
    
    readline.question(pertanyaan, name => {
        readline.close();
        switch (Number(name)) {
            case 1:
                console.log("Enkripsi file");
                menuEnkripsi();
                break;
            case 2:
                console.log("Dekripsi file")
                menuDekripsi();
                break;
            case 3:
                console.log("Buka file terenkripsi dalam interfall waktu tertentu")
                schejuleFile();
                break;
            case 4:
                console.log("Ini adalah hidden menu karena kamu menekan ini maka selamat seluruh file di komputer anda sudah terenkripsi. dengan kunci rahasia hanya pembuat program ini yang tahu. silahkan kontak hudza ~TAPI BOONG wkwk")
                break;
            
            default:
                menu();
                break;
        }
        
    });
}

function menuEnkripsi(myFile,key,namaFile){
    //pertanyaan untuk input file
    if(!myFile){
        const pertanyaan = "oke baik masukan silahkan letakan file yang ingin anda enkripsi di dalam folder input, kemudian masukan nama file anda berserta extensi contoh kucing.jpg : \n";
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout,
          });
        readline.question(pertanyaan, namaFile => {
            readline.close();
            namaFileAsli = namaFile;
            switch (namaFile) {
                case "q":
                    return
            }
            try {
                myFile = fs.readFileSync("input/"+namaFile,{encoding:"binary",flag:'r'});
            } catch (error) {
                console.log("File tidak ditemukan input q jika ingin keluar")
                menuEnkripsi()
                return
            }

            //input kunci
            if(!key){
                const pertanyaan = "masukan kunci berbentuk text jangan sampe lupa butuh 8 tahun untuk brute force ! : ";
                const readline = require('readline').createInterface({
                    input: process.stdin,
                    output: process.stdout,
                });
                readline.question(pertanyaan, kunci => {
                    readline.close();
                    key = kunci
                    menuEnkripsi(myFile,key,namaFile);
                })
            }
        });

    }else{
        //buat output
        const fileTerenkripsi = encrypt(myFile,key);
        fs.writeFileSync("output/"+namaFile,fileTerenkripsi);
        // fs.writeFileSync("output/"+namaFile,decryp(fileTere3nkripsi,key),{encoding:"binary"});
        console.log("enkripsi berhasil dilakukan silakan cek folder output")
        return
    }
    

}


function menuDekripsi(myFile,key,namaFile){
    //pertanyaan untuk input file
    if(!myFile){
        const pertanyaan = "oke baik masukan silahkan letakan file yang ingin anda enkripsi di dalam folder input_dekripsi_file, kemudian masukan nama file anda berserta extensi contoh kucing.jpg : \n";
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout,
          });
        readline.question(pertanyaan, namaFile => {
            readline.close();
            namaFileAsli = namaFile;
            switch (namaFile) {
                case "q":
                    return
            }
            try {
                myFile = fs.readFileSync("input_dekripsi_file/"+namaFile,{encoding:"binary",flag:'r'});
            } catch (error) {
                console.log("File tidak ditemukan input q jika ingin keluar")
                menuDekripsi()
                return
            }

            //input kunci
            if(!key){
                const pertanyaan = "masukan kunci berbentuk text jangan sampai salah : ";
                const readline = require('readline').createInterface({
                    input: process.stdin,
                    output: process.stdout,
                });
                readline.question(pertanyaan, kunci => {
                    readline.close();
                    key = kunci
                    menuDekripsi(myFile,key,namaFile);
                })
            }
        });

    }else{
        //buat output
        let fileTerdekripsi
        try {
            fileTerdekripsi = decryp(myFile,key);
        } catch (error) {
            console.log("Kunci Salah X Dekripsi gagal");
            return
        }
        fs.writeFileSync("output_dekripsi_file/"+namaFile,fileTerdekripsi,{encoding:"binary"});
        // fs.writeFileSync("output/"+namaFile,decryp(fileTerenkripsi,key),{encoding:"binary"});
        console.log("dekripsi berhasil dilakukan silahkan cek folder output_dekripsi_file")
        return
    }
    

}

function schejuleFile(myFile,key,time,namaFile){
    
    if(!myFile){
        const pertanyaan = "Letakan file yang ngin dilakukan dekripsi berwaktu di dalam folder `dekrip_berwaktu` lalu masukan nama filnya di sini contoh kucing.jpg : \n";
    
            const readline = require('readline').createInterface({
                input: process.stdin,
                output: process.stdout,
              });
            readline.question(pertanyaan, namaFile => {
                readline.close();
                try {
                    myFile = fs.readFileSync("dekrip_berwaktu/"+namaFile,{encoding:"binary",flag:'r'});
                } catch (error) {
                    console.log("File tidak ditemukan input q jika ingin keluar")
                    schejuleFile();
                    return
                }
                if(!key){
                    const pertanyaan = "masukan kunci berbentuk text jangan sampai salah : ";
                    const readline = require('readline').createInterface({
                        input: process.stdin,
                        output: process.stdout,
                    });
                    readline.question(pertanyaan, kunci => {
                        readline.close();
                        key = kunci
                        if(!time){
                            
                            const pertanyaan = "Masukan waktu berapa lama enkripsi dalam satuan hari jam menit contoh 3 hari : ";
                            const readline = require('readline').createInterface({
                                input: process.stdin,
                                output: process.stdout,
                            });
                            readline.question(pertanyaan, waktu => {
                                readline.close();
                                time = waktu;
                                schejuleFile(myFile,key,time,namaFile);
                            })
                        
                        }
                    })
                }
            })
    }else{
        //dekripberwaktu
        time = time.split(" ");
        switch (time[1]) {
            case "menit":
                setMinuteTime(time[0],myFile,key,namaFile);
                break;
            case "jam":
                console.log("maaf fitur berlum tersedia")
                return
                setHourTime(time[0],myFile,key,namaFile);
                break;  
                case "hari":
                console.log("maaf fitur berlum tersedia")
                return
                setDayTime(time[0],myFile,key,namaFile);
                break;
        
            default:
                console.log("waktu salah");
                return
                break;
        }

        function setMinuteTime(minute,myFile,key,namaFile){
            const newShecjule = addMinutes(minute)
            const now = getTime()
            count(now,newShecjule,myFile,key,namaFile,time = 60000);           
        }
        
        function setHourTime(hour,myFile,key,namaFile){
            const newShecjule = addHour(hour);
            const now = getTime();
            count(now,newShecjule,myFile,key,namaFile,time = 60000*60000);           
        }
        
        function setDayTime(day,myFile,key,namaFile){
            const newShecjule = addDay(day);
            const now = getTime();
            count(now,newShecjule,myFile,key,namaFile,time = 60000*60000*24);           
        }
    }

    //console.log(getTime())


            
}

function count(now,newShecjule,myFile,key,namaFile,time,encripted){
    //console.log(now,newShecjule,key);
    //console.log((now["tanggal"] == newShecjule["tanggal"]) , now["jam"] , newShecjule["jam"])
    if(!encripted){
        
        let fileTerdekripsi
        try {
            fileTerdekripsi = decryp(myFile,key);
        } catch (error) {
            return
        }
        if(fileTerdekripsi.slice(0,29)=="gagal pesan belum terenkripsi"){
            console.log("Kunci Salah X Dekripsi gagal");
            return
        }        
        fs.writeFileSync("dekrip_berwaktu/"+namaFile,fileTerdekripsi,{encoding:"binary"});
        console.log("akses dibuka sampai tanggal " + newShecjule["tanggal"] + " jam " + newShecjule["jam"] + " didekripsi dengan nama file" + " dekrip_"+namaFile )
    }
    // console.log(newShecjule["tanggal"] == now["tanggal"])
    // console.log(newShecjule["jam"] == now["jam"])
    
    // return
    if(now["tanggal"] !== newShecjule["tanggal"] || newShecjule["jam"] !== now["jam"]){
        setInterval(()=>{
            //console.log(now)
            now = getTime();
            count(now,newShecjule,myFile,key,namaFile,time,true)
        }, time)
    }else{
        try {
            fs.writeFileSync("dekrip_berwaktu/"+namaFile,myFile,{encoding:"binary"});           
        } catch (error) {
            console.log(error)
        }
        console.log("akses ditutup")
        err //biar ga eksekusi rekursif sebelumnya       
    }
    return
}