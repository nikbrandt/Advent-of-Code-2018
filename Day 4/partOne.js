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
        if (!guards[current.guard]) guards[current.guard] = {};
        if (!guards[current.guard].sleepTotal) guards[current.guard].sleepTotal = 0;
        if (!guards[current.guard].mins) {
            guards[current.guard].mins = {};
            for (let i = 0; i < 60; i++) 
                guards[current.guard].mins[i] = 0;
        }
    }

    if (obj[5] === 'falls asleep') {
        current['time'] = obj.date;
    }

    if (obj[5] === 'wakes up') {
        let newSleep = obj.date - current['time'];
        guards[current.guard].sleepTotal += newSleep;
        for (let i = obj[4] - newSleep; i < obj[4]; i++) {
            guards[current.guard].mins[i]++;
        }
    }
    
});

let guardsVals = Object.values(guards);
let guardKeys = Object.keys(guards);
let sleepiest = -1;
let sleepiestSleepCount = 0;
for (let i = 0; i < guardsVals.length; i++) {
    if (guardsVals[i].sleepTotal > sleepiestSleepCount) {
        sleepiest = guardKeys[i];
        sleepiestSleepCount = guardsVals[i].sleepTotal;
    }
}

let sleepiestMinute = -1;
let sleepiestMinuteCount = -1;
for (let i = 0; i < 60; i++) {
    if (guards[sleepiest].mins[i] > sleepiestMinuteCount) {
        sleepiestMinute = i;
        sleepiestMinuteCount = guards[sleepiest].mins[i];
    }
}

let mostMinute = -1;
let mostMinuteTimes = -1;
let mostMinuteGuard = -1;
for (let i = 0; i < 60; i++) {
    let currentTimes = -1;
    let currentMostGuard = -1;
    for (let j = 0; j < guardsVals.length; j++) {
        if (guardsVals[j].mins[i] > currentTimes) {
            currentMostGuard = guardKeys[j];
            currentTimes = guardsVals[j].mins[i];
        }
    }
    if (currentTimes > mostMinuteTimes) {
        mostMinute = i;
        mostMinuteTimes = currentTimes;
        mostMinuteGuard = currentMostGuard;
    }
}

console.log(`Sleepiest guard is guard #${sleepiest} with a crazy ${sleepiestSleepCount} minutes total and sleepiest minute ${sleepiestMinute} with multiplied answer of ${sleepiest * sleepiestMinute}.`);
console.log(`Guard who sleeps the most at one given minute is #${mostMinuteGuard} on minute ${mostMinute} (${guards[mostMinuteGuard].mins[mostMinute]} times) with mult ${mostMinute * mostMinuteGuard}.`);