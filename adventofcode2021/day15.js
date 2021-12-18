const fs = require('fs');
const path = require('path');
const { outputGrid } = require('./util');

const data = fs.readFileSync(path.join(__dirname, 'day15-test.txt'), { encoding: 'utf8' }).toString();

let numData = data
  .split('\n')
  .map(line => line.split('').map(num => parseInt(num)));

// console.log(numData);
// outputGrid(numData);

const getRisk =(numGrid) => {
  const riskGrid = new Array(numGrid.length).fill(null).map(line => new Array (numGrid[0].length).fill(0));

  numGrid.forEach((line, y) => {
    line.forEach((num, x) => {
      if (x > 0 || y > 0) {
        const leftRisk = (x > 0) ? riskGrid[y][x - 1] : Number.MAX_SAFE_INTEGER;
        const upRisk = (y > 0) ? riskGrid[y - 1][x] : Number.MAX_SAFE_INTEGER;
        const lowestRisk = Math.min(leftRisk, upRisk);
        riskGrid[y][x] = lowestRisk + num;
      }
    });
  });

  console.table(riskGrid);

  return riskGrid[riskGrid.length - 1][riskGrid[0].length - 1];
}

const getBigData = (numGrid) => {
  const smallWidth = numGrid[0].length;
  const smallHeight = numGrid.length;
  const bigWidth = smallWidth * 5;
  const bigHeight = smallHeight * 5;
  const bigGrid = new Array(bigHeight).fill(null).map(line => new Array (bigWidth).fill(0));

  for (let i = 0; i < 5; i++) {
    const yOffset = smallHeight * i;
    for (let j = 0; j < 5; j++) {
      const xOffset = smallWidth * j;
      numGrid.forEach((line, y) => {
        const debugLine = [];
        line.forEach((num, x) => {
            const offsetNum = (i + j > 0) ? (num + ((i + j) - 1)) % 9 + 1 : num;
            // debugLine.push(offsetNum);
            bigGrid[yOffset + y][xOffset + x] = offsetNum;
        });
        // console.log(i, j, line.join(''));
        // console.log(i, j, debugLine.join(''));
        // console.log('');
      });
    }
  }
  // outputGrid(bigGrid);
  return bigGrid;
}


console.log('Part 1', getRisk(numData));
console.log('Part 2', getRisk(getBigData(numData))); // does not work
