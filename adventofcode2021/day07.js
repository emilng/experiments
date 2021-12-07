const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'day07.txt'), { encoding: 'utf8' }).toString();

const crabs = data
  .split(',')
  .map(num => parseInt(num, 10))
  .sort((a,b) => a - b);

const calcFuelPart1 = (crabPos, target) => {
  return Math.abs(crabPos - target);
}

const calcFuelPart2 = (crabPos, target) => {
  let fuel = Math.abs(crabPos - target);
  return (fuel * (fuel + 1)) / 2;
}

const getFuel = (target, calcFuel) => {
  let fuelCount = 0;
  let fuel;
  let currentPos;
  crabs.forEach(crabPos => {
    if (currentPos !== crabPos) {
      fuel = calcFuel(crabPos, target)
      currentPos = crabPos;
    }
    fuelCount += fuel;
  });
  return fuelCount;
};

const findMin = (calcFuel) => {
  let min = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < crabs[crabs.length - 1]; i++) {
    let fuel = getFuel(i, calcFuel);
    min = Math.min(min, fuel);
    if (fuel > min) return min;
  }
}

console.log('Part 1', findMin(calcFuelPart1));
console.log('Part 2', findMin(calcFuelPart2));