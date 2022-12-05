import { loadData , sumItems} from './util.js';

const data = loadData('day03.txt');

const splitStringInTwo = (str) => {
  const splitIndex = str.length / 2;
  return [
    str.slice(0, splitIndex),
    str.slice(splitIndex),
  ];
};

const overlapItemLookup = (lookup, compareStrings) => {
  for (const char of lookup) {
    if (compareStrings.every(str => str.includes(char))) {
      return char;
    }
  }
};

const getOverlapItem = (itemArrays) => {
  const [first, ...rest] = itemArrays;
  const lookup = new Set(first.split(''));
  return overlapItemLookup(lookup, rest);
};

const getPriority = (char) => {
  // offset ascii code so that 'a' starts at 1 or 'A' starts at 27
  const offset = char.toLowerCase() === char ? 96 : 38;
  return char.charCodeAt() - offset;
};

const groupInThrees = (arr = [], item) => {
  const lastArray = arr.at(-1);
  if (lastArray && lastArray.length < 3) {
    lastArray.push(item);
  } else {
    arr.push([item]);
  }
  return arr;
};

let prioritySum;

// part 1: get sum of priorities of overlapping items between 2 halves of a rucksack

prioritySum = data
  .split('\n')
  .map(splitStringInTwo)
  .map(getOverlapItem)
  .map(getPriority)
  .reduce(sumItems, 0);

console.log(prioritySum);

// part 2: get sum of priorities of overlapping items between group of 3 rucksacks

prioritySum = data
  .split('\n')
  .reduce(groupInThrees, [])
  .map(getOverlapItem)
  .map(getPriority)
  .reduce(sumItems, 0);

console.log(prioritySum);

