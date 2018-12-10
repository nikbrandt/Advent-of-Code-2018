const fs = require('fs');

let input = fs.readFileSync('input.txt').toString().split('\n').slice(0, -1)
    .map(str => {
        let matched = str.match(/position=< ?(-?\d+),  ?(-?\d+)> velocity=< ?(-?\d+),  ?(-?\d+)>/);
        return { x: parseInt(matched[1]), y: parseInt(matched[2]), xV: parseInt(matched[3]), yV: parseInt(matched[4]) };
    });

let min = Number.MAX_VALUE;
let i = 0;
while (true) {
    let max = Number.MIN_VALUE;
    input.forEach(obj => {
        obj.x += obj.xV;
        obj.y += obj.yV;
        if (Math.abs(obj.y) > max) max = Math.abs(obj.y);
    });

    if (max < min) min = max;
    else {
        input.forEach(obj => {
            obj.x -= obj.xV;
            obj.y -= obj.yV;
        });
        break;
    };
    i++
}

let minX = Number.MAX_VALUE;
let minY = Number.MAX_VALUE;
let maxX = Number.MIN_VALUE;
let maxY = Number.MIN_VALUE;

input.forEach(obj => {
    if (obj.x < minX) minX = obj.x;
    if (obj.y < minY) minY = obj.y;
    if (obj.x > maxX) maxX = obj.x;
    if (obj.y > maxY) maxY = obj.y;
});

let grid = [];

let totalX = Math.abs(maxX) + 2;
let totalY = Math.abs(maxY) + 2;

for (let i = 0; i < totalY; i++) {
    grid.push([]);
    for (let j = 0; j < totalX; j++) {
        grid[i].push('.');
    }
}

input.forEach(obj => grid[obj.y][obj.x] = '#');

if (minY > 0) grid = grid.slice(minY - 1);
if (minX > 0) grid = grid.map(arr => arr.slice(minX - 1));

let string = '';

for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
        string += grid[i][j];
    }
    string += '\n';
}

console.log(string);
console.log('After %s seconds.', i);