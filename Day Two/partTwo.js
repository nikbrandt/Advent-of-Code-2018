const fs = require('fs');

const input = fs.readFileSync('input.txt');

let split = input.toString().split('\n');

let positions = [];

split.forEach(text => {
    let letterArray = Array.from(text);
    positions.push(letterArray);
});

split.forEach((t, i) => { // loop through every string
    let counts = {}; // nums of diff letters from current array
    positions[i].forEach((letter, j) => { // loop through letter array
        positions.forEach((array, k) => { // loop through every string to check against letters
            if (k === i) return;
            if (array[j] !== letter) {
                if (counts[k]) counts[k]++;
                else counts[k] = 1;
            }
        });
    });

    Object.values(counts).forEach((val, j) => {
        if (val === 1) {
            console.log(split[i]);
            console.log(split[j]);
        }
    }); 
});