const fs = require('fs');
const theRegex = /Step ([A-Z]) must be finished before step ([A-Z]) can begin\./;

const input = fs.readFileSync('input.txt').toString().split('\n').slice(0, -1);

let steps = {};

input.forEach(string => {
    let parsed = string.match(theRegex);
    let step = parsed[2];
    let prereq = parsed[1];

    if (!steps[prereq]) steps[prereq] = {};
    if (!steps[step]) steps[step] = {};
    if (steps[step].prereqs) steps[step].prereqs.push(prereq);
    else steps[step].prereqs = [prereq];
});

let unfinished = Object.keys(steps);
let finished = [];
let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

let workers = [];
for (let i = 0; i < 5; i++) {
    workers.push({
        current: '.',
        remaining: 0
    });
}

let second = -1;

while (true) {
    second++;
    
    let available = [];
    for (let i = 0; i < workers.length; i++) {
        workers[i].remaining--;
        if (workers[i].remaining <= 0) {
            finished.push(workers[i].current);
            workers[i].current = '.';
        }
        if (workers[i].current === '.') available.push(i);
    }
    
    if (available.length === 0) continue;
    if (unfinished.length === 0 && available.length === workers.length) break;

    let possibles = [];

    unfinished.forEach(step => {
        if (steps[step].prereqs) { // if the step has prerequisites, check if they are all finished
            let canGo = true;
            for (let j = 0; j < steps[step].prereqs.length; j++) { // loop through all prerequisites
                if (!finished.includes(steps[step].prereqs[j])) canGo = false; // if the prereq is not finished, be unable to go
            }
            if (canGo) possibles.push(step);
        } else possibles.push(step);
    });

    possibles.sort();

    let max = possibles.length;
    if (max > available.length) max = available.length;
    for (let i = 0; i < max; i++) {
        let workNum = available[i];
        workers[workNum].current = possibles[i];
        workers[workNum].remaining = 61 + alphabet.indexOf(possibles[i]);
        unfinished.splice(unfinished.indexOf(possibles[i]), 1);
    }
}

console.log(`After ${second} seconds, all work is done.`);

// not 432