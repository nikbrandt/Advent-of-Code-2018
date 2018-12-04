const fs = require('fs');
const dateRegex = /\[1518-([0-9]+)-([0-9]+) ([0-9]+):([0-9]+)\] (Guard #([0-9]+) begins shift|falls asleep|wakes up)/;
const input = fs.readFileSync('input.txt').toString().split('\n').slice(0, -1);

let sorted = [];

input.forEach(string => {
    const matched = string.match(dateRegex);  
    // g1 month, g2 day, g3 hour, g4 minute, g5 leave blank, g6 guard # (if there is one)
    // added date, UNIX timestamp
    matched['date'] = new Date(`1518-${matched[1]}-${matched[2]}T${matched[3]}:${matched[4]}:00Z`).getTime();


    if (sorted.length > 0) {
        for (let i = 1; i < sorted.length; i++) {
            if (sorted[i - 1].date < matched.date && sorted[i].date > matched.date) sorted.splice(i, 0, matched);
        }
    } else sorted.push(matched);
});

let count = 0;
input.forEach(string => {
    count++;

    console.log(string);
    
    if (count === 3) count = 0;
});