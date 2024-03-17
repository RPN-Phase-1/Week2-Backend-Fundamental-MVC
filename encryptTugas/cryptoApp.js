const CryptoJS = require("crypto-js");

function encrypt(text, key) {
  if (!text || !key) {
    return "Invalid Text Or Key Value";
  }
  return CryptoJS.AES.encrypt(text, key).toString();
}

function decrypt(encryptedText, key) {
  if (!encryptedText || !key) {
    return "Invalid Text Or Key Value";
  }
  const bytes = CryptoJS.AES.decrypt(encryptedText, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}

module.exports = { encrypt, decrypt };
