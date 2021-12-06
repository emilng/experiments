const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'day06.txt'), { encoding: 'utf8' }).toString();

const fish = data
  .split(',')
  .map(num => parseInt(num, 10));

const initCount = new Array(9).fill(0);
fish.forEach(fish => initCount[fish] += 1);

const getTotalFish = (days) => {
  const counter = initCount.concat();

  let i = 1;
  while(i <= days) {
    const last = counter.shift();
    counter.push(last);
    counter[6] += last;
    i++;
  }

  return counter.reduce((sum, i) => { return sum + i }, 0);
}

console.log('Part 1', getTotalFish(80))
console.log('Part 2', getTotalFish(256))

