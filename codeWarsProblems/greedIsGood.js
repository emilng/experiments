const TRIPLETS = /111|222|333|444|555|666/;
const TRIPLET_SCORES = { 111: 1000, 666: 600, 555: 500, 444: 400, 333: 300, 222: 200 };

function score( dice ) {
  let currentScore = 0;
  let diceString = dice
    .concat()
    .sort()
    .join('');
  const matchedTriplets = diceString.match(TRIPLETS);
  if (matchedTriplets) {
    currentScore += TRIPLET_SCORES[matchedTriplets[0]];
    diceString  = diceString.replace(TRIPLETS, '');
  }
  const ones = diceString.match(/1/g);
  const fives = diceString.match(/5/g);
  if (ones) currentScore += (ones.length * 100);
  if (fives) currentScore += (fives.length * 50);

  return currentScore;
}

console.log([2, 4, 4, 5, 4], score([2, 4, 4, 5, 4]));
console.log([1, 1, 5, 1, 5], score([1, 1, 5, 1, 5]));
console.log([1, 1, 1, 1, 1], score([1, 1, 1, 1, 1]));
console.log([1, 1, 1, 1, 5], score([1, 1, 1, 1, 5]));