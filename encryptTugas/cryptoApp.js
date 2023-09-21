var CryptoJS = require("crypto-js");
const encrypt = (message,key) =>{
    return CryptoJS.AES.encrypt(message,String(key)).toString();
}
const decryp = (chipertext,key) =>{
    let  plainText
    try {
        plainText = CryptoJS.AES.decrypt(chipertext,key).toString(CryptoJS.enc.Utf8);
    } catch (error) {
        return "gagal pesan belum terenkripsi" + error
    }
    if(plainText){
        return plainText
    }
    return "kunci salah"
}
// console.log(decryp("U2FsdGVkX1++pQqKC3qWog949WBsHur00vEU1bM5ZIA=","123"));
module.exports = {encrypt,decryp}