const fs = require('fs');

let input = fs.readFileSync('input.txt').toString().split(' ');

input.forEach((inp, i) => {
    input[i] = parseInt(inp);
});

let total = 0;

down ();

function down () {
    let childrenCount = input[0];
    let metaCount = input[1];
    input = input.slice(2);

    for (let i = 0; i < childrenCount; i++) {
        down();
    }

    for (let i = 0; i < metaCount; i++) {
        total += input[0];
        input = input.slice(1);
    }
}

console.log(`Total: ${total}`);