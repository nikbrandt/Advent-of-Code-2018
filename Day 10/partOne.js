const fs = require('fs');

let input = fs.readFileSync('input.txt').toString().split('\n').slice(0, -1)
    .map(str => {
        let matched = str.match(/position=< ?(-?\d+),  ?(-?\d+)> velocity=< ?(-?\d+),  ?(-?\d+)>/);
        return { x: parseInt(matched[1]), y: parseInt(matched[2]), xV: parseInt(matched[3]), yV: parseInt(matched[4]) };
    });

let min = Number.MAX_VALUE;
let i = 0;
let stop = false;
while (true) {
    let max = Number.MIN_VALUE;
    input.forEach(obj => {
        obj.x += obj.xV;
        obj.y += obj.yV;
        // console.log(obj.x);
        if (Math.abs(obj.y) > max) max = Math.abs(obj.y);
        // writeGrid();
    });

    console.log(max);
    if (max < min) min = max;
    else {
        input.forEach(obj => {
            obj.x -= obj.xV;
            obj.y -= obj.yV;
        });
        break;
    };

    /*if (stop) break;
    if (max < min) min = max;
    else {
        stop = true;
        continue;
    };
    console.log(max);
    // if (max < 100) break; */
    i++
}

console.log(`got to ${i} iterator`);

// console.log(input);
writeGrid();

function writeGrid() {
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

    let newInput = input.map(obj => {
        return { x: Math.abs(minX) + obj.x, y: Math.abs(minY) + obj.y };
    });

    console.log(`${minX} ${maxX} ${minY} ${maxY}`);
    
    let grid = [];
    
    let totalX = Math.abs(minX) + Math.abs(maxX) + 2;
    let totalY = Math.abs(minY) + Math.abs(maxY) + 2;

    // let shrinkFactor = 10;

    console.log(totalX + ' uh ' + totalY);
    for (let i = 0; i < totalY; i++) {
        grid.push([]);
        for (let j = 0; j < totalX; j++) {
            grid[i].push('.');
        }
    }
    
    newInput.forEach(obj => {
        // console.log(obj);
        grid[obj.y][obj.x] = '#';
    });
    
    let string = '';
    
    for (let i = 0; i < totalY; i++) {
        for (let j = 0; j < totalX; j++) {
            string += grid[i][j];
        }
        string += '\n';
    }
    
    fs.writeFileSync('output.txt', string);
}


console.log('written.');