
const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'day02.txt'), { encoding: 'utf8' }).toString();

const roundResults = data
  .split('\n')                // split by line
  .map((item) => {
    return item
      .split(' ')             // split by character
      .join('');              // combine characters for lookup
  });

const getSum = (roundResults, scoreLookup) => {
  const scores = roundResults.map(chars => { // get score for each round
    return scoreLookup[chars] || 0;
  });

  return scores                              // sum scores from each round
    .reduce((sum, score) => {
      return sum += score;
    }, 0);
}

// part 1: find score based on sum of scores from rock paper scissors rounds

const part1ScoreLookup = { AX: 1 + 3, AY: 2 + 6, AZ: 3 + 0, BX: 1 + 0, BY: 2 + 3, BZ: 3 + 6, CX: 1 + 6, CY: 2 + 0, CZ: 3 + 3};

console.log(getSum(roundResults, part1ScoreLookup));

// part 2: find score based on sum of scores from rock paper scissors rounds where second character determines outcome

const part2ScoreLookup = { AX: 3 + 0, AY: 1 + 3, AZ: 2 + 6, BX: 1 + 0, BY: 2 + 3, BZ: 3 + 6, CX: 2 + 0, CY: 3 + 3, CZ: 1 + 6};

console.log(getSum(roundResults, part2ScoreLookup));
