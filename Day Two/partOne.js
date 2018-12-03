const fs = require('fs');

const input = fs.readFileSync('input.txt');

let split = input.toString().split('\n');

let twice = 0;
let thrice = 0;

split.forEach(text => {
    let letterArray = Array.from(text);
    let letters = {};
    letterArray.forEach(letter => {
        if (!letters[letter]) letters[letter] = 1;
        else letters[letter]++;
    });

    let twiceOcc = false;
    let thriceOcc = false;

    console.log(letters);

    Object.values(letters).forEach((num, i) => {
        if (!twiceOcc && num === 2) {
            twice++;
            twiceOcc = true;
        }
        if (!thriceOcc && num === 3) {
            thrice++;
            thriceOcc = false;
        }
    });
});

console.log('checksum: ' + (thrice * twice));