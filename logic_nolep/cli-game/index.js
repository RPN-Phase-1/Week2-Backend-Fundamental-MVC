import fs from 'fs/promises';
import readline from 'readline';
import chalk from 'chalk';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let dataFile = 'data.json';
let currentUser = null;

async function loadUsers() {
    try {
        const data = await fs.readFile(dataFile, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

async function saveUsers(data) {
    await fs.writeFile(dataFile, JSON.stringify(data, null, 2));
}

function question(query) {
    return new Promise((resolve) => rl.question(query, resolve));
}

function questionMasking(query) {
    return new Promise((resolve) => {
        const stdin = process.openStdin();

        const onDataHandler = (char) => {
            char = char + '';
            switch (char) {
                case '\n':
                case '\r':
                case '\u0004':
                    stdin.removeListener("data", onDataHandler);
                    break;
                default:
                    process.stdout.clearLine();
                    readline.cursorTo(process.stdout, 0);
                    process.stdout.write(query + Array(rl.line.length + 1).join('*'));
                    break;
            }
        }

        stdin.on('data', onDataHandler);

        rl.question(query, value => {
            rl.history = rl.history.slice(1);
            resolve(value);
        });
    });
}

async function login() {
    console.clear();
    console.log(chalk.blue.bold('=== Login ==='));
    const username = await question(chalk.yellow('Username: '));
    const password = await questionMasking(chalk.yellow('Password: '));

    const users = await loadUsers();
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        currentUser = user.username;
        await mainMenu();
    } else {
        await question((chalk.red('\nOops! It looks like the username or password you entered is wrong.')))
    }
}

async function register() {
    console.clear();
    console.log(chalk.blue.bold('=== Register ==='));
    const username = await question(chalk.yellow('Username: '));
    const password = await questionMasking(chalk.yellow('Password: '));

    if (!username || !password) {
        await question(chalk.red('\nOops! That\'s not a valid username or password.'));
        return;
    }

    const users = await loadUsers();
    if (users.some(u => u.username === username)) {
        await question(chalk.red('\nOops! The username you entered is already taken.'));
    } else {
        users.push({
            username,
            password,
            highestScore: 999
        });
        await saveUsers(users);
        await question(chalk.green('\nRegistration successfull!'))
    }
}

async function playGame() {
    console.clear();
    console.log(chalk.blue.bold('=== Number Guessing Game ==='));
    console.log(chalk.green(`Welcome to the Number Guessing Game, ${chalk.bold(currentUser)}!`));
    console.log(chalk.green('I\'ve picked a number between 1 and 100. Can you guess what it is?'));

    const users = await loadUsers();
    const user = users.find((u) => u.username === currentUser);

    const rng = Math.floor(Math.random() * 100) + 1;
    let attempts = 0;

    while (true) {
        const input = await question(chalk.yellow('Enter your guess (1-100): '));

        const guess = Number(input);

        if (isNaN(guess) || guess < 1 || guess > 100) {
            console.log(chalk.red('Oops! That\'s not a valid number. Please enter a number between 1 and 100.'));
            continue;
        }

        attempts++;

        if (guess < rng) {
            console.log(chalk.blue('Hmm... Your guess is too low! Try a higher number.'));
        } else if (guess > rng) {
            console.log(chalk.blue('Oops! Your guess is too high. Try a lower number.'));
        } else {
            console.log(chalk.green(`\nWow! You got it right! The number I picked was ${chalk.bold(rng)}.`));
            console.log(chalk.green(`Congratulations! You guessed it in ${chalk.bold(attempts)} tries!`));

            if (attempts < user.highestScore) {
                user.highestScore = attempts;
                console.log(chalk.green.bold("Great job! You're really good at guessing numbers! This is your new highscore."));
            }

            await saveUsers(users);

            const choice = await question(chalk.yellow('Would you like to play again? [Y/n]: '));
            if (choice === 'n' || choice === 'N') mainMenu();
            else await playGame();
        }
    }
}

async function showLeaderboard() {
    console.clear();
    console.log(chalk.blue.bold('=== Leaderboard ==='));

    const users = await loadUsers();
    users.sort((a, b) => a.highestScore - b.highestScore);
    for (let i = 0; i < users.length; i++) {
        if (i > 9) break;
        console.log(chalk.green(`${i + 1}. ${chalk.bold(users[i].highestScore)} attempts by ${chalk.bold(users[i].username)}`));
    }

    await question(chalk.yellow('\nPress any key to continue...'));
}

async function mainMenu() {
    while (true) {
        console.clear();
        console.log(chalk.blue.bold('=== Main Menu ==='));
        console.log(chalk.green(`Hello, ${chalk.bold(currentUser)}! What would you like to do next?`));
        console.log(chalk.blue('1. Play'));
        console.log(chalk.blue('2. View Leaderboard'));
        console.log(chalk.blue('3. Logout'));
        const choice = await question(chalk.yellow('Enter your choices (1-3): '));

        switch (choice) {
            case '1':
                await playGame(currentUser);
                break;
            case '2':
                await showLeaderboard();
                break;
            case '3':
                currentUser = null;
                main();
                return;
            default:
                break;
        }
    }
}

async function main() {
    while (true) {
        console.clear();
        console.log(chalk.blue.bold('=== Number Guessing Game ==='));
        console.log(chalk.green("Please choose an option:"));
        console.log(chalk.blue('1. Login'));
        console.log(chalk.blue('2. Register'));
        console.log(chalk.blue('3. Exit'));
        const choice = await question(chalk.yellow('Enter your choices (1-3): '));

        switch (choice) {
            case '1':
                await login();
                break;
            case '2':
                await register();
                break;
            case '3':
                rl.close();
                return;
            default:
                break;
        }
    }
}

main();
