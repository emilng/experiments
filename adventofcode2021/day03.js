const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'day03.txt'), { encoding: 'utf8' }).toString();

BITS = 12;

const numlist = data
  .split('\n')
  .map(num => {
    return num
      .split('')
      .map(bit => parseInt(bit));
  });

/** PART 1 **/
const counters = new Array(BITS)
counters.fill(0, 0);

numlist.forEach(bits => {
  bits.forEach((bit, i) => {
    counters[i] += bit;
  });
});

const gammaRateString = counters
  .map(count => {
    return Math.round(count / numlist.length);
  })
  .join('');

const gammaRate = parseInt(gammaRateString, 2);
const epsilonRate = ~gammaRate & 0xfff; // invert AND 12 bit mask
console.log('Part 1', gammaRate * epsilonRate);

/** PART 2 **/
const getRating = (bitKeepFunc) => {
  let ratingNumList = numlist.concat();
  for (let i = 0; i < BITS; i++) {
    let counter = 0;
    ratingNumList.forEach((num) => {
      counter += num[i];
    });
    const bitToKeep = bitKeepFunc(counter, ratingNumList.length);
    const filteredList = ratingNumList.filter(num => {
      return num[i] === bitToKeep;
    });
    if (filteredList.length > 0) {
      ratingNumList = filteredList;
    }
  };
  const ratingString = ratingNumList[ratingNumList.length - 1]
    .join('');
  return parseInt(ratingString, 2);
};

const oxGenBitKeepFunc = (counter, listLength) => {
  return Math.round( counter / listLength );
}

const cScrubberBitKeepFunc = (counter, listLength) => {
  return ~Math.round( counter / listLength ) & 1; // invert AND 1 bit mask
}

const oxGenRating = getRating(oxGenBitKeepFunc);
const cScrubberRating = getRating(cScrubberBitKeepFunc);

console.log('Part 2', oxGenRating * cScrubberRating);
