const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'day05.txt'), { encoding: 'utf8' }).toString();

const lines = data
  .split('\n')
  .map(line => {
    const points = line.split(' -> ');
    const p = [];
    points.forEach((point, i) => {
      p[i] = point
        .split(',')
        .map(num => parseInt(num, 10));
    });
    return { x1: p[0][0], y1: p[0][1], x2: p[1][0], y2: p[1][1] };
  });

const horizonalVerticalLines = lines.filter(line => {
  return (line.x1 === line.x2) || (line.y1 === line.y2);
});

const pointLookup = {};

const getOrientation = (line) => {
  const xdir = line.x2 > line.x1 ? 1 : -1;
  const ydir = line.y2 > line.y1 ? 1 : -1;
  const checkX = line.x2 > line.x1
    ? (x, line) => { return (x >= line.x1 && x <= line.x2); }
    : (x, line) => { return (x >= line.x2 && x <= line.x1); };
  const checkY = line.y2 > line.y1
    ? (y, line) => { return (y >= line.y1 && y <= line.y2); }
    : (y, line) => { return (y >= line.y2 && y <= line.y1); };
  return { xdir, ydir, checkX, checkY};
};

const updateLookup = (x, y) => {
  if (pointLookup[`${x},${y}`]) {
    pointLookup[`${x},${y}`] += 1;
  } else {
    pointLookup[`${x},${y}`] = 1;
  }
};

horizonalVerticalLines.forEach(line => {
  const { xdir, ydir, checkX, checkY } = getOrientation(line);
  for (let y = line.y1; checkY(y, line); y += ydir) {
    for (let x = line.x1; checkX(x, line); x += xdir) {
      updateLookup(x, y);
    }
  }
});

let overlaps = 0;
Object.values(pointLookup).forEach(value => {
  if (value > 1) overlaps++;
});
console.log('Part 1', overlaps);

const diagonalLines = lines.filter(line => {
  return (line.x1 !== line.x2) && (line.y1 !== line.y2);
})

diagonalLines.forEach(line => {
  const { xdir, ydir, checkX, checkY } = getOrientation(line);
  let x = line.x1;
  let y = line.y1;
  while(checkX(x, line) && checkY(y, line)) {
    updateLookup(x, y);
    x += xdir;
    y += ydir;
  }
});

overlaps = 0;
Object.values(pointLookup).forEach(value => {
  if (value > 1) overlaps++;
});
console.log('Part 2', overlaps);
