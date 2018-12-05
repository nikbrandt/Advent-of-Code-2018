const fs = require('fs');

let originalInput = fs.readFileSync('input.txt').toString().slice(0, -1);
// console.log(input.charAt(input.length - 1) + ' other ' + input.charAt(0));

let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

let greatestLetterNum = Number.MAX_VALUE;
alphabet.forEach(letter => {
    let newInput = originalInput.replace(new RegExp(letter, 'g'), '').replace(new RegExp(letter.toUpperCase(), 'g'), '');
    process.stdout.write(`Trying without ${letter}.. `);
    let out = loop(newInput);
    console.log(out);
    if (out < greatestLetterNum) {
        greatestLetterNum = out;
    }
})

function loop (input) {
    while (true) {
        let reacted = false;
    
        for (let i = 1; i < input.length; i++) {
    
            if (input.charAt(i - 1).toLowerCase() === input.charAt(i).toLowerCase() && 
                (
                    (input.charAt(i - 1) === input.charAt(i - 1).toLowerCase() && input.charAt(i) === input.charAt(i).toUpperCase()) ||
                    (input.charAt(i - 1) === input.charAt(i - 1).toUpperCase() && input.charAt(i) === input.charAt(i).toLowerCase())
                )
            ) {
                input = input.substring(0, i - 1) + input.substring(i + 1);
                reacted = true;
                break;
            }
        }
    
        if (reacted === false) break;
    }

    return input.length;
}
 // 9823 too high
 console.log(`Finished with input string ${loop(originalInput)} characters long.`);
 console.log(`oh yeah and the other thing did get the number ${greatestLetterNum}.`);