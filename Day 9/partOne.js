const fs = require('fs');

const input = fs.readFileSync('input.txt').toString().match(/([0-9]+) players; last marble is worth ([0-9]+)/);

const playerCount = input[1];
const highestMarble = input[2];

let board = [ 0 ];
let player = 1;
let current = 0; // current POSITION
let players = {};
for (let i = 1; i <= playerCount; i++) {
    players[i] = 0;
}

for (let i = 1; i <= highestMarble; i++) {
    if (i % 23 === 0) {
        players[player] += i;
        let offs = offset(-7);
        players[player] += board[offs];
        board.splice(offs, 1);
        current = offs;
    } else {
        let offs = offset(2);
        board.splice(offs, 0, i);
        current = offs;
    }

    // process.stdout.write(`[${player}] `);
    player++;
    if (player > playerCount) player = 1;
    // console.log(board.join(', '));
}

function offset(num) {
    if (board.length === 1) return 1;
    let total = num + current;
    if (total <= board.length && total >= 0) return total;
    if (total < 0) return board.length + total; 
    return total - board.length;
}

let biggest = 0;
Object.values(players).forEach(score => {
    if (score > biggest) biggest = score;
});

console.log(biggest);
// not 400511