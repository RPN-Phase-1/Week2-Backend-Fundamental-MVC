import readline from 'readline';
import fs from 'fs/promises';
import chalk from 'chalk';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let users = [];
let currentUser = null;

// Baca data pengguna dari file JSON
async function loadUsers() {
  try {
    const data = await fs.readFile('users.json', 'utf8');
    users = JSON.parse(data);
  } catch (err) {
    console.log(chalk.yellow('Tidak ada file users.json. Akan dibuat file baru.'));
  }
}

async function saveUsers() {
  await fs.writeFile('users.json', JSON.stringify(users, null, 2));
}

function prompt(question) {
  return new Promise(resolve => rl.question(question, resolve));
}

async function login() {
  console.log(chalk.blue('\n=== LOGIN ==='));
  const username = await prompt('Masukkan username: ');
  const password = await prompt('Masukkan password: ');
  
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    currentUser = user;
    console.log(chalk.green('Login berhasil!'));
    mainMenu();
  } else {
    console.log(chalk.red('Login gagal! Username atau password salah.'));
    startMenu();
  }
}

async function register() {
  console.log(chalk.blue('\n=== REGISTER ==='));
  const username = await prompt('Masukkan username baru: ');
  if (users.some(u => u.username === username)) {
    console.log(chalk.red('Username sudah ada! Pilih username lain.'));
    startMenu();
    return;
  }
  const password = await prompt('Masukkan password: ');
  users.push({ username, password, highestScore: Infinity });
  await saveUsers();
  console.log(chalk.green('Registrasi berhasil! Silakan login.'));
  startMenu();
}

function startMenu() {
  console.log(chalk.cyan('\n=== MENU AWAL ==='));
  console.log('1. Login');
  console.log('2. Register');
  console.log('3. Exit');

  rl.question('Pilih opsi: ', async (option) => {
    if (option === '1') {
      await login();
    } else if (option === '2') {
      await register();
    } else if (option === '3') {
      console.log(chalk.yellow('Terima kasih telah bermain!'));
      rl.close();
    } else {
      console.log(chalk.red('Pilihan tidak valid!'));
      startMenu();
    }
  });
}

function mainMenu() {
  console.log(chalk.cyan('\n=== MAIN MENU ==='));
  console.log('1. Mulai Game');
  console.log('2. Lihat Papan Skor');
  console.log('3. Logout');

  rl.question('Pilih opsi: ', (option) => {
    if (option === '1') {
      playGame();
    } else if (option === '2') {
      showLeaderboard();
    } else if (option === '3') {
      currentUser = null;
      console.log(chalk.yellow('Logout berhasil!'));
      startMenu();
    } else {
      console.log(chalk.red('Pilihan tidak valid!'));
      mainMenu();
    }
  });
}

function showLeaderboard() {
  console.log(chalk.blue('\n=== Papan Skor ==='));
  const sortedUsers = users
    .filter(user => user.highestScore !== Infinity)
    .sort((a, b) => a.highestScore - b.highestScore)
    .slice(0, 10);
  if (sortedUsers.length === 0) {
    console.log('Belum ada skor yang tercatat.');
  } else {
    sortedUsers.forEach((user, index) => {
      console.log(`${index + 1}. ${user.username} - ${user.highestScore} kali`);
    });
  }
  mainMenu();
}

async function playGame() {
  console.log(chalk.green('\n=== Game Dimulai! ==='));
  console.log('Tebak angka antara 1 - 100');
  
  const targetNumber = Math.floor(Math.random() * 100) + 1;
  let attempts = 0;

  async function makeGuess() {
    const guess = await prompt('Tebakan Anda: ');
    const number = parseInt(guess);
    attempts++;

    if (isNaN(number) || number < 1 || number > 100) {
      console.log(chalk.red('Masukkan angka antara 1 - 100!'));
      return makeGuess();
    }

    if (number < targetNumber) {
      console.log(chalk.yellow('Terlalu rendah!'));
      return makeGuess();
    }

    if (number > targetNumber) {
      console.log(chalk.yellow('Terlalu tinggi!'));
      return makeGuess();
    }

    console.log(chalk.green(`Selamat! Anda menebak dengan benar dalam ${attempts} kali tebakan.`));
    if (attempts < currentUser.highestScore) {
      currentUser.highestScore = attempts;
      await saveUsers();
    }
    mainMenu();
  }

  makeGuess();
}

async function main() {
  await loadUsers();
  startMenu();
}

main();
