// count the number of times the sum of a three digit sliding window is greater than the sum of the previous sliding window values

const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'day01.txt'), { encoding: 'utf8' }).toString();

const numlist = data
  .split('\n')
  .map(num => parseInt(num, 0));

let increaseCount = 0;
let previousSum = NaN;
let windowValues = [];

const sum = (previous, current) => {
  return previous + current;
};

numlist.forEach(num => {
  if (windowValues.length >= 3) {
    windowValues.shift();
  }
  windowValues.push(num);
  if (windowValues.length === 3) {
    const currentSum = windowValues.reduce(sum);
    if (currentSum > previousSum) increaseCount++;
    previousSum = currentSum;
  }
});

console.log(increaseCount);