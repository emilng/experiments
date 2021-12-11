const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'day11.txt'), { encoding: 'utf8' }).toString();

let lines = data
  .split('\n')
  .map(line => {
    return line
      .split('')
      .map(num => parseInt(num))
  });

const resetFlashed = () => {
  return lines
    .flatMap(line => line.map(num => 0));
}
let flashed = resetFlashed();

const getSurrounding = (x, y) => {
  return [[x-1, y-1], [x, y-1], [x+1, y-1], [x-1, y], [x+1, y], [x-1, y+1], [x, y+1], [x+1, y+1]];
}

const isFlashed = (x, y) => {
  return flashed[(y * 10) + x]
};

const setFlashed = (x, y) => {
  return flashed[(y * 10) + x] = 1
};

let flashCount = 0;
const steps = 100;
const update = (x, y, stepCount) => {
  if ( x < 0 || x >= lines[0].length || y < 0 || y >= lines.length) return;
  if (isFlashed(x, y)) return;
  lines[y][x] = (lines[y][x] < 9) ? (lines[y][x] + 1) : 0;
  if (lines[y][x] === 0) {
    setFlashed(x, y);
    if (stepCount < steps) flashCount++;
    getSurrounding(x, y).forEach(xy => update(xy[0], xy[1], stepCount))
  }
}

let step = 0;
let syncFound = false;
while(!syncFound) {
  lines.forEach((line, y) => line.forEach((num, x) => update(x, y, step)));
  syncFound = !flashed.includes(0);
  flashed = resetFlashed();
  step++;
}

console.log('Part 1', flashCount);
console.log('Part 2', step);
