import readline from 'readline';
import chalk from 'chalk';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const board = [
  ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
  ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
  ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖']
];

const letters = 'abcdefgh';
let currentPlayer = 'white';

function printBoard() {
  console.clear();
  console.log(chalk.yellow('   a  b  c  d  e  f  g  h'));
  console.log('  -------------------------');
  for (let i = 0; i < 8; i++) {
    let row = `${8 - i} |`;
    for (let j = 0; j < 8; j++) {
      row += ` ${board[i][j]} `;
    }
    console.log(chalk.blue(row + `| ${8 - i}`));
  }
  console.log('  -------------------------');
  console.log(chalk.yellow('   a  b  c  d  e  f  g  h'));
}

function movePiece(from, to) {
  const [fromX, fromY] = parseMove(from);
  const [toX, toY] = parseMove(to);
  
  if (isValidMove(fromX, fromY, toX, toY)) {
    board[toX][toY] = board[fromX][fromY];
    board[fromX][fromY] = ' ';
    currentPlayer = currentPlayer === 'white' ? 'black' : 'white';
  } else {
    console.log(chalk.red('Gerakan tidak valid. Coba lagi.'));
  }
}

function parseMove(move) {
  return [8 - parseInt(move[1]), letters.indexOf(move[0])];
}

function isValidMove(fromX, fromY, toX, toY) {
  return board[fromX][fromY] !== ' ' && (fromX !== toX || fromY !== toY);
}

function askMove() {
  rl.question(chalk.green(`${currentPlayer}'s turn (e.g., e2 e4): `), (input) => {
    const [from, to] = input.split(' ');
    if (from && to) {
      movePiece(from, to);
      printBoard();
    }
    askMove();
  });
}

printBoard();
askMove();
