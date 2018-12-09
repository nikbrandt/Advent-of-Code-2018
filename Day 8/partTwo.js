const fs = require('fs');

let input = fs.readFileSync('input.txt').toString().split(' ');

input.forEach((inp, i) => {
    input[i] = parseInt(inp);
});

function down () {
    let childrenCount = input[0];
    let metaCount = input[1];
    input = input.slice(2);

    let total = 0;
    let children = [];

    for (let i = 0; i < childrenCount; i++) {
        children.push(down());
    }

    for (let i = 0; i < metaCount; i++) {
        if (childrenCount === 0) total += input[0];
        else if (children[input[0] - 1]) total += children[input[0] - 1];
        input = input.slice(1);
    }

    return total;
}

console.log(`Total: ${down()}`);