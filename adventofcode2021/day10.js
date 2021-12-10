const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'day10.txt'), { encoding: 'utf8' }).toString();

let lines = data
  .split('\n')
  .map(line => line.split(''));

const pairs = { '(': ')', '[': ']', '{': '}', '<': '>' };
const syntaxPoints = { ')': 3, ']': 57, '}': 1197, '>': 25137 };
const completePoints = { ')': 1, ']': 2, '}': 3, '>': 4 };

let syntaxScore = 0;
let completeScores = [];
lines.forEach(line => {
  let stack = [];
  let isIncomplete = true;
  line.forEach(char => {
    if ('([{<'.includes(char)) {
      stack.push(pairs[char]);
    } else if (char !== stack.pop()) {
      isIncomplete = false;
      syntaxScore += syntaxPoints[char];
    }
  });
  if (isIncomplete) {
    const lineCompleteScore = stack
      .reverse()
      .reduce((score, char) => {
        return (score * 5) + completePoints[char];
      }, 0);
    completeScores.push(lineCompleteScore);
  }
});

completeScores = completeScores.sort((a, b) => a - b);
const autocompleteScore =completeScores[Math.floor(completeScores.length / 2)];

console.log('Part 1', syntaxScore);
console.log('Part 2', autocompleteScore);
