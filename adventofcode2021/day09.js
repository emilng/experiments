const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'day09.txt'), { encoding: 'utf8' }).toString();

let points = data
  .split('\n')
  .map(row => [9, ...row.split('').map(num => parseInt(num)), 9]);
const padding = new Array(points[0].length).fill(9);
points = [ padding, ...points, padding];

const lowestPoints = [];
const basins = {};
const basinRefs = [];

points.forEach((row, y) => {
  basinRefs.push([]);
  row.forEach((p, x) => {
    basinRefs[y].push(false);
    if (p < 9) {
      if (p === Math.min(p, points[y][x - 1], points[y][x + 1], points[y - 1][x], points[y + 1][x])) {
        lowestPoints.push(p + 1);
      }
      const topRef = basinRefs[y - 1][x];
      const leftRef = basinRefs[y][x - 1];
      let basinRef = topRef || leftRef;
      if (topRef && leftRef && topRef !== leftRef) {
        const topY = basins[topRef][0][0];
        const leftY = basins[leftRef][0][0];
        const deleteRef = (topY < leftY) ? leftRef : topRef;
        basinRef = (topY < leftY) ? topRef : leftRef;
        basins[deleteRef].forEach(([y, x]) => {
          basinRefs[y][x] = basinRef;
        })
        basins[basinRef] = [...basins[basinRef], ...basins[deleteRef]];
        delete basins[deleteRef];
      }
      const currentRef = `${y},${x}`;
      if (basinRef) {
        basins[basinRef].push([y, x]);
      } else {
        basins[currentRef] = [[y, x]];
      }
      basinRefs[y][x] = basinRef || currentRef;
    }
  })
});

const riskLevel = lowestPoints.reduce((s, i) => s + i);
console.log('Part 1', riskLevel);

const basinProduct = Object.values(basins)
  .map(basin => basin.length)
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((p, i) => p * i, 1);
console.log('Part 2', basinProduct);
