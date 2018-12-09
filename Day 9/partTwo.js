const fs = require('fs');

const input = fs.readFileSync('input.txt').toString().match(/([0-9]+) players; last marble is worth ([0-9]+)/);

const playerCount = input[1];
const highestMarble = input[2] * 100;

class Marble {
    constructor(val, next, prev) {
        this.value = val;
        this.next = next || this;
        this.prev = prev || this;
    }
}

let current = new Marble(0);
let player = 1;
let players = {};
for (let i = 1; i <= playerCount; i++) {
    players[i] = 0;
}

for (let i = 1; i <= highestMarble; i++) {
    if (i % 23 === 0) {
        let back7 = current.prev.prev.prev.prev.prev.prev.prev;
        current = back7.next;
        back7.prev.next = back7.next;
        back7.next.prev = back7.prev;
        players[player] += i + back7.value;
        // console.log(`added ${i} + ${back7.value}, current is now ${current.value}`);
    } else {
        current = new Marble(i, current.next.next, current.next);
        current.prev.next = current.next.prev = current;
        // console.log(`cur ${current.value} prev ${current.prev.value} next ${current.next.value}`);
    }

    player++;
    if (player > playerCount) player = 1;
}

console.log(Math.max(...Object.values(players)));