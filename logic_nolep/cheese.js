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

function printBoard() {
  console.log('  a b c d e f g h');
  for (let i = 0; i < 8; i++) {
    let row = (8 - i) + ' ';
    for (let j = 0; j < 8; j++) {
      row += board[i][j] + ' ';
    }
    console.log(row);
  }
}

function isPathClear(fromRow, fromCol, toRow, toCol) {
  const rowStep = (toRow - fromRow) === 0 ? 0 : (toRow - fromRow) / Math.abs(toRow - fromRow);
  const colStep = (toCol - fromCol) === 0 ? 0 : (toCol - fromCol) / Math.abs(toCol - fromCol);

  let currentRow = fromRow + rowStep;
  let currentCol = fromCol + colStep;

  while (currentRow !== toRow || currentCol !== toCol) {
    if (board[currentRow][currentCol] !== ' ') {
      return false; // Jalur tidak bersih
    }
    currentRow += rowStep;
    currentCol += colStep;
  }
  return true; // Jalur bersih
}

function isValidMove(from, to, currentPlayer) {
  const fromRow = 8 - parseInt(from[1]);
  const fromCol = from.charCodeAt(0) - 'a'.charCodeAt(0);
  const toRow = 8 - parseInt(to[1]);
  const toCol = to.charCodeAt(0) - 'a'.charCodeAt(0);
  const piece = board[fromRow][fromCol];
  const targetPiece = board[toRow][toCol];

  // Cek apakah bidak yang dipilih sesuai dengan giliran pemain
  if ((currentPlayer === 'Putih' && piece === '♟') || (currentPlayer === 'Hitam' && piece === '♙')) {
    console.log('Anda tidak dapat menggerakkan bidak lawan!');
    return false;
  }

  // Cek apakah gerakan valid berdasarkan jenis bidak
  switch (piece) {
    case '♙': // Pion Putih
      if (fromCol === toCol) {
        // Gerakan maju
        if (fromRow - toRow === 1 && targetPiece === ' ') return true; // Satu langkah
        if (fromRow === 6 && fromRow - toRow === 2 && targetPiece === ' ') return true; // Dua langkah
      } else if (Math.abs(fromCol - toCol) === 1 && fromRow - toRow === 1 && targetPiece !== ' ') {
        return true; // Menangkap
      }
      break;
    case '♟': // Pion Hitam
      if (fromCol === toCol) {
        // Gerakan maju
        if (toRow - fromRow === 1 && targetPiece === ' ') return true; // Satu langkah
        if (fromRow === 1 && toRow - fromRow === 2 && targetPiece === ' ') return true; // Dua langkah
      } else if (Math.abs(fromCol - toCol) === 1 && toRow - fromRow === 1 && targetPiece !== ' ') {
        return true; // Menangkap
      }
      break;
    case '♘': // Kuda
      if ((Math.abs(fromRow - toRow) === 2 && Math.abs(fromCol - toCol) === 1) ||
          (Math.abs(fromRow - toRow) === 1 && Math.abs(fromCol - toCol) === 2)) {
        return true; // Gerakan Kuda valid
      }
      break;
    case '♗': // Gajah
    case '♝':
      if (Math.abs(fromRow - toRow) === Math.abs(fromCol - toCol)) {
        // Cek apakah jalur bebas
        return isPathClear(fromRow, fromCol, toRow, toCol);
      }
      break;
    case '♖': // Rook
    case '♜':
      if (fromRow === toRow || fromCol === toCol) {
        // Cek apakah jalur bebas
        return isPathClear(fromRow, fromCol, toRow, toCol);
      }
      break;
    case '♕': // Ratu
    case '♛':
      if (Math.abs(fromRow - toRow) === Math.abs(fromCol - toCol) || 
          fromRow === toRow || fromCol === toCol) {
        // Cek apakah jalur bebas
        return isPathClear(fromRow, fromCol, toRow, toCol);
      }
      break;
    case '♔': // Raja
    case '♚':
      if (Math.abs(fromRow - toRow) <= 1 && Math.abs(fromCol - toCol) <= 1) {
        return true; // Raja bergerak satu langkah ke segala arah
      }
      break;
  }
  return false; // Gerakan tidak valid
}

function movePiece(from, to) {
  const fromRow = 8 - parseInt(from[1]);
  const fromCol = from.charCodeAt(0) - 'a'.charCodeAt(0);
  const toRow = 8 - parseInt(to[1]);
  const toCol = to.charCodeAt(0) - 'a'.charCodeAt(0);

  if (isValidMove(from, to, currentPlayer)) {
    const targetPiece = board[toRow][toCol];

    // Jika ada bidak lawan di posisi tujuan, "bunuh" bidak tersebut
    if (targetPiece !== ' ') {
      console.log(`Bidak ${targetPiece} di posisi ${to} telah dibunuh!`);
    }

    // Pindahkan bidak
    board[toRow][toCol] = board[fromRow][fromCol];
    board[fromRow][fromCol] = ' ';
    printBoard();
    return true; // Gerakan valid
  } else {
    console.log('Gerakan tidak valid!');
    return false; // Gerakan tidak valid
  }
}

let currentPlayer = 'Putih'; // Mulai dengan pemain putih

function playGame() {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function askMove() {
    readline.question(`${currentPlayer}, masukkan gerakan (e.g., e2 e4): `, (input) => {
      const [from, to] = input.split(' ');

      // Validasi input
      if (!from || !to || from.length !== 2 || to.length !== 2) {
        console.log('Input tidak valid! Harap masukkan gerakan dalam format yang benar (e.g., e2 e4).');
        askMove();
        return;
      }

      if (movePiece(from, to)) {
        // Ganti giliran hanya jika gerakan valid
        currentPlayer = currentPlayer === 'Putih' ? 'Hitam' : 'Putih'; 
      }
      askMove();
    });
  }

  printBoard(); // Tampilkan papan sebelum permainan dimulai
  askMove();
}

playGame();