const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'day08.txt'), { encoding: 'utf8' }).toString();

const entries = data
  .split('\n')
  .map(line => {
    return line.split(' | ');
  });

//  0000
// 1    2
// 1    2
//  3333
// 4    5
// 4    5
//  6666
const segmentNumsToDigit = {
  '012456':   0,
  '25':       1,
  '02346':    2,
  '02356':    3,
  '1235':     4,
  '01356':    5,
  '013456':   6,
  '025':      7,
  '0123456':  8,
  '012356':   9,
};

const getSegmentCounts = (segments) => {
  const counts = {};
  segments.split('').forEach(segment => {
    counts[segment] = !counts[segment] ? 1 : counts[segment] + 1;
  });
  return counts;
}

// segments by frequency and existence in known digits
// 0 in 8 digits not in 1
// 1 in 6 digits
// 2 in 8 digits is in 1
// 3 in 7 digits is in 4
// 4 in 4 digits
// 5 in 9 digits
// 6 in 7 digits not in 4
const getSegmentLookup = (encodedSegments) => {
  const one = encodedSegments.match(/\b\w\w\b/)[0];
  const four = encodedSegments.match(/\b\w\w\w\w\b/)[0];

  const segmentCounts = getSegmentCounts(encodedSegments.split(' ').join(''));

  const segments = {};
  for (const key in segmentCounts) {
    switch(segmentCounts[key]) {
      case 4:
        segments[key] = 4;
        break;
      case 6:
        segments[key] = 1;
        break;
      case 7:
        segments[key] = (four.includes(key)) ? 3 : 6;
        break;
      case 8:
        segments[key] = (one.includes(key)) ? 2 : 0;
        break;
      case 9:
        segments[key] = 5;
        break;
    }
  }
  return segments;
}

const getDigitFromSegments = (segmentLookup, segments) => {
  const segmentNums = segments
    .split('')
    .map(segment => segmentLookup[segment])
    .sort()
    .join('');
  return segmentNumsToDigit[segmentNums];
}

let part1Sum = 0;
let part2Sum = 0;
entries.forEach(entry => {
  const segmentLookup = getSegmentLookup(entry[0]);
  const getDigitFromLookup = getDigitFromSegments.bind(this, segmentLookup);
  const outputDigits = entry[1]
    .split(' ')
    .map(getDigitFromLookup);
  outputDigits.forEach((digit) => {
    if ([1, 4, 7, 8].includes(digit)) {
      part1Sum++;
    }
  })
  part2Sum += parseInt(outputDigits.join(''));
});

console.log('Part 1', part1Sum);
console.log('Part 2', part2Sum);

