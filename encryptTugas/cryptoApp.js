var CryptoJS = require("crypto-js");
const encrypt = (message,key) =>{
    return CryptoJS.AES.encrypt(message,String(key)).toString();
}
const decryp = (chipertext,key) =>{
    const plainText = CryptoJS.AES.decrypt(chipertext,key).toString(CryptoJS.enc.Utf8);
    if(plainText){
        return plainText
    }
    return "kunci salah"
}
// console.log(decryp("U2FsdGVkX1++pQqKC3qWog949WBsHur00vEU1bM5ZIA=","123"));
module.exports = {encrypt,decryp}