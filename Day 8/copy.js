const fs = require('fs');

let orig = fs.readFileSync('original.txt').toString();
fs.writeFileSync('input.txt', orig);