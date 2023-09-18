//app schejule encripsi
//hudzaifah assyahid /@kentung
//muhammadhudzaifahassyahid5@gmail.com
const {encrypt,decryp} = require("./cryptoApp");
const {schejuleTask} = require("./scheduleApp");
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
    3. Membuka enkripsi file dengan timer waktu tertenu.
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
                console.log("c")
                break;
            case 4:
                console.log("d")
                break;
            case 5:
                console.log("e")
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
        const pertanyaan = "oke baik masukan silahkan letakan file yang ingin anda enkripsi di dalam folder input, kemudian masukan nama file anda berserta extensi contoh kucing.jpg : ";
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
        // fs.writeFileSync("output/"+namaFile,decryp(fileTerenkripsi,key),{encoding:"binary"});
        console.log("enkripsi berhasil dilakukan silakan cek folder output")
        return
    }
    

}


function menuDekripsi(myFile,key,namaFile){
    //pertanyaan untuk input file
    if(!myFile){
        const pertanyaan = "oke baik masukan silahkan letakan file yang ingin anda enkripsi di dalam folder input_dekripsi_file, kemudian masukan nama file anda berserta extensi contoh kucing.jpg : ";
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
