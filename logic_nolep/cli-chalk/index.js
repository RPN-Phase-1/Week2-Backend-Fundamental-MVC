import fs from 'fs/promises';
import readline from 'readline';
import chalk from 'chalk';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const dataFile = 'users.json';

async function loadUsers() {
    try {
        const data = await fs.readFile(dataFile, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

async function saveUsers(users) {
    await fs.writeFile(dataFile, JSON.stringify(users, null, 2));
}

function question(query) {
    return new Promise((resolve) => rl.question(query, resolve));
}

function askPassword(query) {
    return new Promise((resolve) => {
        const stdin = process.openStdin();

        // Intercept user input for password masking
        const onDataHandler = (char) => {
            char = char + '';
            switch (char) {
                // Enter
                case '\n':
                // Carriage return
                case '\r':
                // End of Transmission (Ctrl-D)
                case '\u0004':
                    stdin.removeListener("data", onDataHandler);
                    // stdin.pause();
                    break;
                default:
                    // Clear current line
                    process.stdout.clearLine();
                    // Move cursor to the beginning
                    readline.cursorTo(process.stdout, 0);
                    // Mask input
                    process.stdout.write(query + Array(rl.line.length + 1).join('*'));
                    break;
            }
        }

        // Listen to stdin for input
        stdin.on('data', onDataHandler);

        // Use readline to capture the actual input value
        rl.question(query, value => {
            // Clear history to prevent re-display
            rl.history = rl.history.slice(1);
            // Resolve the entered password
            resolve(value);
        });
    });
}

async function login() {
    console.clear();
    console.log(chalk.blue.bold('=== Login ==='));
    const username = await question(chalk.yellow('Username: '));
    const password = await askPassword(chalk.yellow('Password: '));

    const users = await loadUsers();
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        user.status = 'online';
        user.lastLogin = new Date().toISOString();
        await saveUsers(users);
        console.log(chalk.green('Login successful!'));
        console.log(chalk.cyan(`Welcome back, ${username}!`));
    } else {
        console.log(chalk.red('Invalid username or password.'));
    }
}

async function register() {
    console.clear();
    console.log(chalk.blue.bold('=== Register ==='));
    const username = await question(chalk.yellow('Choose a username: '));
    const password = await askPassword(chalk.yellow('Choose a password: '));

    const users = await loadUsers();
    if (users.some(u => u.username === username)) {
        console.log(chalk.red('Username already exists.'));
    } else {
        users.push({
            username,
            password,
            status: 'offline',
            lastLogin: null
        });
        await saveUsers(users);
        console.log(chalk.green('Registration successful!'));
    }
}

async function changePassword() {
    console.clear();
    console.log(chalk.blue.bold('=== Change Password ==='));
    const username = await question(chalk.yellow('Enter your username: '));
    const oldPass = await askPassword(chalk.yellow('Enter your old password: '));

    const users = await loadUsers();
    const user = users.find(u => u.username === username && u.password === oldPass);

    if (user) {
        const newPass = await askPassword(chalk.yellow('Enter your new password: '));
        user.password = newPass;
        await saveUsers(users);
        console.log(chalk.green(`Password changed successfully!`));
    } else {
        console.log(chalk.red('The user was not found or the old password you entered is incorrect'));
    }
}

async function logout() {
    console.clear();
    console.log(chalk.blue.bold('=== Logout ==='));
    const username = await question(chalk.yellow('Enter your username: '));

    const users = await loadUsers();
    const user = users.find(u => u.username === username);

    if (user && user.status === 'online') {
        user.status = 'offline';
        await saveUsers(users);
        console.log(chalk.green(`${username} has been logged out.`));
    } else {
        console.log(chalk.red('User not found or not logged in.'));
    }
}

async function listUsers() {
    console.clear();
    console.log(chalk.blue.bold('=== User List ==='));
    const users = await loadUsers();
    users.forEach(user => {
        const statusColor = user.status === 'online' ? chalk.green : chalk.red;
        console.log(chalk.cyan(`Username: ${user.username}`));
        console.log(statusColor(`Status: ${user.status}`));
        console.log(chalk.yellow(`Last Login: ${user.lastLogin || 'Never'}`));
        console.log('-'.repeat(30));
    });
}

async function main() {
    while (true) {
        console.log('\n');
        console.log(chalk.blue.bold('=== Main Menu ==='));
        console.log(chalk.yellow('1. Login'));
        console.log(chalk.yellow('2. Register'));
        console.log(chalk.yellow('3. Change Password'));
        console.log(chalk.yellow('4. Logout'));
        console.log(chalk.yellow('5. List Users'));
        console.log(chalk.yellow('6. Exit'));
        const choice = await question(chalk.magenta('Enter your choice (1-6): '));

        switch (choice) {
            case '1':
                await login();
                break;
            case '2':
                await register();
                break;
            case '3':
                await changePassword();
                break;
            case '4':
                await logout();
                break;
            case '5':
                await listUsers();
                break;
            case '6':
                console.log(chalk.green('Goodbye!'));
                rl.close();
                return;
            default:
                console.log(chalk.red('Invalid choice. Please try again.'));
        }
    }
}

main();
