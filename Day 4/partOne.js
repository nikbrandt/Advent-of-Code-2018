const fs = require('fs');
const dateRegex = /\[1518-([0-9]+)-([0-9]+) ([0-9]+):([0-9]+)\] (Guard #([0-9]+) begins shift|falls asleep|wakes up)/;
const input = fs.readFileSync('input.txt').toString().split('\n').slice(0, -1);

input.forEach((string, i) => {
    const matched = string.match(dateRegex);  
    // g1 month, g2 day, g3 hour, g4 minute, g5 leave blank, g6 guard # (if there is one)
    // added date, UNIX timestamp
    matched['date'] = new Date(`1518-${matched[1]}-${matched[2]}T${matched[3]}:${matched[4]}:00Z`).getTime() / 1000 / 60;
    // console.log(matched.date + " equals " + new Date(matched.date).toString() + " with original " + matched[0]);

    input[i] = matched;
});

input.sort((a, b) => {
    return a.date - b.date;
});

let guards = {}; // sleepTotal: total mins of sleep; mins: object of minutes w/ sleeping time per
let current = {}
input.forEach(obj => {
    if (obj[6]) {
        current['guard'] = obj[6];
        if (!guards[current.guard].sleepTotal) guards[current.guard].sleepTotal = 0;
        if (!guards[current.guard].mins) {
            guards[current.guard].mins = {};
            for (let i = 0; i < 60; i++) 
                guards[current.guard].mins[i] = 0;
        }
        continue;
    }

    if (obj[5] === 'falls asleep') {
        current['state'] = 'asleep';
        let newSleep = obj.date - current['time'];
        guards[current.guard].sleepTotal += newSleep;
        for (let i = current['time']; i < current['time'] + newSleep; i++) {
            guards[current.guard].sleep[obj[4]]++;
        }
        current['time'] = obj.date;
    }
    
});