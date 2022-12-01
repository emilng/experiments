// part 1: find maximum sum of group sums

const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'day01.txt'), { encoding: 'utf8' }).toString();

const sums = data
  .split('\n\n')
  .map((group) => {
    return group
      .split('\n')
      .reduce((sum, item) => {
        return sum += Number(item);
      }, 0);
  });

console.log(Math.max.apply(null, sums));

// part 2: find sum of top 3 group sums

sums.sort((a, b) => b - a);

const [a, b, c, ...rest] = sums;

console.log(a +  b + c);
