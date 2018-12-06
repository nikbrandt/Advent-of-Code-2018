const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().split('\n').slice(0, -1);
// console.log(input);

let coordinates = [];

let largest = [0, 0]; // largest x, y 
input.forEach(text => {
    let x = text.split(', ');
    let y = parseInt(x[1]);
    x = parseInt(x[0]);

    if (x > largest[0]) largest[0] = x;
    if (y > largest[1]) largest[1] = y;

    coordinates.push( { x, y, areaNum: 0 } );
});

largest[0] += 500;
largest[1] += 500;

let grid = [[], [], []];

for (let i = 0; i <= largest[1]; i++) {
    grid.push([]);
    for (let j = -1; j <= largest[0]; j++) {
        grid[i].push({ x: j, y: i, closest: null });
        let closest = [Number.MAX_VALUE, -1]; // distance, coordinate number
        for (let k = 0; k < coordinates.length; k++) {
            let distanceToK = Math.abs(j - coordinates[k].x) + Math.abs(i - coordinates[k].y);
            
            if (distanceToK < closest[0]) {
                closest[0] = distanceToK;
                closest[1] = k;
            } else if (distanceToK === closest[0]) {
                closest[0] = distanceToK;
                closest[1] = null
            }
        }
        grid[i][j].closest = closest;
        if (closest[1] !== null) coordinates[closest[1]].areaNum++;
    }
}

let biggest = [0, 0]; // amount, coord num
coordinates.forEach(coords => {
    if (coords.areaNum > biggest[0]) biggest = [ coords.areaNum, coords ];
})

let alphabet = 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz'.split('');
let alphabetUpper = 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');

let tempString = '';

let tempArr = ['', '', ''];

for (let i = 0; i <= largest[0]; i++) {
    if (i > 99) tempArr[0] += Math.floor(i / 100);
    else tempArr[0] += 0;
    if (i > 9) tempArr[1] += Math.floor(i / 10);
    else tempArr[1] += 0;
    tempArr[1] += i % 10;
}

tempString += tempArr[0] + '\r\n' + tempArr[1] + '\r\n' + tempArr[2] + '\r\n';

grid.forEach(arr => {
    arr.forEach(coo => {
        if (coo.closest[0] === 0) {
            tempString += alphabetUpper[coo.closest[1]];
        }
        else tempString += coo.closest[1] !== null ? alphabet[coo.closest[1]] : '.';
    });
    tempString += '\r\n';
});

fs.writeFileSync('output.txt', tempString);

console.log(`Biggest area is: ${biggest[0]} - x: ${biggest[1].x}, y: ${biggest[1].y}`);

// incorrect: 10497

/* let currentMax = [0, 0, 0]; 
coordinates.forEach((coords, iterator) => {
    for (let i = 0; i < coordinates.length; i++) {
        if (i === iterator) continue;
        coordinates[iterator].distanceFrom[i] = Math.abs(coords.x - coordinates[i].x) + Math.abs(coords.y - coordinates[i].y);
    }

    let closest = [Number.MAX_VALUE, 0]; // distance, the coordinates that are that distance
    for (let i = 0; i < coordinates.length; i++) {
        if (coordinates[iterator].distanceFrom[i] < closest[0]) closest = [ coordinates[iterator].distanceFrom[i], i ];
    }

    coordinates[iterator].closest = closest[1];
});

console.log(coordinates); */