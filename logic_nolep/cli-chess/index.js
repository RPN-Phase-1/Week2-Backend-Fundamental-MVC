import { Chess } from 'chess.js';

import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const game = new Chess();

function displayBoard() {
    const board = game.board();

    const pieceSymbols = {
        p: '♟', // Black Pawn
        r: '♜', // Black Rook
        n: '♞', // Black Knight
        b: '♝', // Black Bishop
        q: '♛', // Black Queen
        k: '♚', // Black King
        P: '♙', // White Pawn
        R: '♖', // White Rook
        N: '♘', // White Knight
        B: '♗', // White Bishop
        Q: '♕', // White Queen
        K: '♔', // White King
    };

    console.log('    a   b   c   d   e   f   g   h');
    console.log('  +-------------------------------+');
    //console.log('  ┌───────────────────────────────┐');
    board.forEach((row, rowIndex) => {
        const displayRow = row
            .map(cell => cell ? pieceSymbols[cell.color === 'w' ? cell.type.toUpperCase() : cell.type] : ' ')
            .join(' | ');
        console.log(`${8 - rowIndex} | ${displayRow} | ${8 - rowIndex}`);
        if (rowIndex < board.length - 1) {
            console.log('  |--- --- --- --- --- --- --- ---|');
        }
    });
    //console.log('  └───────────────────────────────┘');
    console.log('  +-------------------------------+');
    console.log('    a   b   c   d   e   f   g   h');
}

function handleMove(move) {
    try {
        return game.move(move, { sloppy: true });
    } catch (err) {
        return false;
    }
}

function gameLoop() {
    console.clear();
    displayBoard();
    if (game.isGameOver()) {
        if (game.isCheckmate()) {
            console.log(`\nCheckmate! ${game.turn() === 'w' ? 'Black' : 'White'} wins!`);
        } else if (game.in_draw()) {
            console.log('\nDraw!');
        } else if (game.isStalemate()) {
            console.log('\nStalemate!');
        }
        rl.close();
        return;
    }

    const currentPlayer = game.turn() === 'w' ? 'White' : 'Black';
    rl.question(`\n${currentPlayer}'s move: `, (input) => {
        if (handleMove(input)) {
            gameLoop();
        } else {
            gameLoop();
        }
    });
}

function main() {
    console.clear();
    console.log('How to play:');
    console.log('1. Each piece type (except pawns) is identified by an uppercase letter.');
    console.log('   R = Rook | N = Knight | B = Bishop | Q = Queen | K = King');
    console.log('2. Moves are entered using algebraic notation with the destination square.')
    console.log('   e4 (pawn moves to e4) | Nc3 (knight moves to c3)');
    console.log('3. To capture a piece enter \'x\' before the destination square.')
    console.log('   Bxe5 (bishop captures the piece on e5)');
    console.log('4. To castle, use the special notations.')
    console.log('   O-O (kingside castling) | O-O-O (queenside castling)');
    console.log('5. When a pawn reaches the last rank, it is promoted to another piece.')
    console.log('   e8Q (white pawn promoted to Queen)');

    rl.question('\nShall we begin? [Y/n]: ', (input) => {
        if (input === 'n' || input === 'N') {
            rl.close();
        } else {
            gameLoop();
        }
    });
}

main();
