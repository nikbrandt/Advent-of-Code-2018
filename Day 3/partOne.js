const claimRegex = /#([0-9]+) @ ([0-9]+),([0-9]+): ([0-9]+)x([0-9]+)/;
const fs = require('fs');

const input = fs.readFileSync('input.txt');

const split = input.toString().split('\n');

let fabric = [[]];

split.forEach(string => {
    const matched = string.match(claimRegex);
    if (!matched) return;
    const x = parseInt(matched[2]);
    const y = parseInt(matched[3]);
    const width = parseInt(matched[4]);
    const height = parseInt(matched[5]);

    // console.log(`id: ${matched[1]}, x: ${x}, y: ${y}, width: ${width}, height: ${height}, fabric length: ${fabric.length}`);

    if (fabric.length < y + height) {
        for (let i = fabric.length; i < y + height; i++) fabric.push([]);
    }

    // console.log(`new fabric length: ${fabric.length}`);

    for (let i = y; i < y + height; i++) {
        if (fabric[i].length < x + width)
            for (let j = fabric[i].length; j < x + width; j++)
                fabric[i].push(0);
        for (let j = x; j < x + width; j++)
            fabric[i][j]++;
    }
});

let count = 0;
let total = 0;

fabric.forEach(upperArray => {
    upperArray.forEach(val => {
        if (val > 1) count++;
        total++;
    });
});

console.log(`${count} sq. ft of ${total} total are overlapping`);

split.forEach(string => {
    const matched = string.match(claimRegex);
    if (!matched) return;
    const x = parseInt(matched[2]);
    const y = parseInt(matched[3]);
    const width = parseInt(matched[4]);
    const height = parseInt(matched[5]);

    let noOverlap = true;

    for (let i = y; i < y + height; i++)
        for (let j = x; j < x + width; j++)
            if (fabric[i][j] > 1) noOverlap = false;
    
    if (noOverlap) console.log(`Claim #${matched[1]} does not overlap.`);
});