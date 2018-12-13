// Warn if overriding existing method
if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});

// above code from https://stackoverflow.com/questions/7837456/how-to-compare-arrays-in-javascript



const fs = require('fs');

const input = fs.readFileSync('input.txt').toString().split('\n').slice(0, -1);
const initial = input[0];
const notes = input.slice(2);

let plants = initial.split('');
notes.forEach((note, i) => {
    notes[i] = note.split(''); // 9th index is thing
    plants.unshift('.');
    plants.push('.');
    plants.push('.');
});

console.log('0:\t' + plants.join(''));

for (let i = 0; i < 20; i++) {
    let copy = plants.slice();
    plants.forEach((plant, index) => {
        let arr = [];
        for (let j = index - 2; j <= index + 2; j++) {
            arr.push(plants[j]);
        }
        let change = '';
        notes.forEach(note => {
            let copy = note.slice();
            if (copy.splice(0, 5).equals(arr)) {
                change = note[9];
            }
        });
        if (change.length > 0) copy[index] = change;
        else copy[index] = plant;
    });
    plants = copy.slice();
    console.log(i + 1 + ':\t' + plants.join(''));
}

let sum = 0;
plants.forEach((p, index) => {
    index = index - notes.length;
    if (p === '#') sum += index;
});

console.log('i got a sum of ' + sum + ', boss.');