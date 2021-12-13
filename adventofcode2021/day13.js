const fs = require('fs');
const path = require('path');
const { outputGrid } = require('./util');

const data = fs.readFileSync(path.join(__dirname, 'day13.txt'), { encoding: 'utf8' }).toString();

let xValues = [];
let yValues = [];
const folds = [];
let lines = data
  .split('\n')
  .forEach(line => {
    if (line.includes(',')) {
      line
        .split(',')
        .forEach((num, i) => {
          const int = parseInt(num);
          i === 0 ? xValues.push(int) : yValues.push(int);
        });
    } else if (line.includes('fold along')) {
      const fold = line
        .split(' ')[2]
        .split('=')
        .map((value, i) => i === 1 ? parseInt(value) : value );
      folds.push(fold);
    }
  });

const getOutput = () => {
  let maxX = Math.max.apply(null, xValues) + 1;
  let maxY = Math.max.apply(null, yValues) + 1;
  let output = (new Array(maxY).fill(null)).map((x, i) => new Array(maxX).fill('.'));
  yValues.forEach((y, i) => {
    const x = xValues[i];
    output[y][x] = '#';
  });
  outputGrid(output);

  return output;
}

const offsetValues = (values, foldPos) => {
  return values.map((pos, i) => {
    return (pos > foldPos) ? foldPos - (pos - foldPos) : pos;
  });
};

const countOutput = (output) => {
  let dotCount = 0;
  output.forEach(line => {
    line.forEach(char => {
      if (char === '#') dotCount++;
    })
  })
  return dotCount;
}

getOutput();

let singleFoldCount = 0;
folds.forEach(([fold, foldPos], i) => {
  if (fold === 'x') {
    xValues = offsetValues(xValues, foldPos);
  } else if (fold === 'y') {
    yValues = offsetValues(yValues, foldPos);
  }
  if (i === 0) singleFoldCount = countOutput(getOutput());
  getOutput();
})

console.log('Part 1', singleFoldCount);


