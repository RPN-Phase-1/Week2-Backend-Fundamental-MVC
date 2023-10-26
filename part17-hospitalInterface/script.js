// script.js
console.log('Argumen yang diberikan:');
console.log(process.argv);

// Ambil argumen kedua (index 2) sebagai nama pengguna
const username = process.argv[2];
if (username) {
  console.log(`Halo, ${username}! Selamat datang.`);
} else {
  console.log('Halo, siapa kamu?');
}
