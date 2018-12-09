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

console.log(steps);
console.log(unfinished);

go();

function go() {
    if (unfinished.length <= 0) return;
    
    let possibles = [];

    unfinished.forEach(step => {
        let temp = '';
        if (steps[step].prereqs) { // if the step has prerequisites, check if they are all finished
            temp += `Step ${step} has prereqs ${steps[step].prereqs}; `;
            let canGo = true;
            for (let j = 0; j < steps[step].prereqs.length; j++) { // loop through all prerequisites
                if (unfinished.includes(steps[step].prereqs[j])) {
                    canGo = false; // if the prereq is unfinished, be unable to go
                    temp += `PR ${steps[step].prereqs[j]} ✗ `;
                }
                temp += `PR ${steps[step].prereqs[j]} ✓ `;
            }
            if (canGo) {
                possibles.push(step);
                temp += '- as such, this step is possible';
            } else temp = null;
        } else {
            possibles.push(step);
            console.log(`Step ${step} has no prereqs and as such is possible`)
        }
        if (temp) console.log(temp);
    });

    possibles.sort();
    console.log(possibles);
    console.log(`Chose ${possibles[0]} as step.`);
    finished.push(possibles[0]);
    unfinished.splice(unfinished.indexOf(possibles[0]), 1);
    
    go();
}

console.log(`\nThe steps should go in the order ${finished.join('')}`);

// incorrect: HAENBPRDISVWQUZJYTKLOX