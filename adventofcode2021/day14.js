const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'day14.txt'), { encoding: 'utf8' }).toString();

let template;
const rules = {};
let lines = data
  .split('\n')
  .forEach((line, i) => {
    if (i === 0) template = line;
    if (line.includes('->')) {
      const rule = line.split(' -> ');
      rules[rule[0]] = rule[1];
    }
  });

console.log(template);
console.table(rules);

const countChars = (string, step) => {
  const count = {};
  Object.values(rules).forEach(rule => count[rule] = 0);
  for (let i = 0; i < string.length; i++) {
    const char = string[i];
    count[char] += 1;
  }
  return count;
};

const transformString = (input, steps) => {
  let output = input;
  for (let step = 0; step < steps; step++) {
    const outputChars = [];
    let len = output.length - 1;
    for (let i = 0; i < len; i++) {
      const key = `${output[i]}${output[i+1]}`;
      outputChars.push(output[i]);
      outputChars.push(rules[key]);
    }
    outputChars.push(output[output.length - 1]);
    output = outputChars.join('');
  }
  return output;
}

const countCharsForRules = (steps) => {
  const ruleCounts = {};
  Object.keys(rules).forEach(rule => {
    const string = transformString(rule, steps);
    ruleCounts[rule] = countChars(string);
  });
  return ruleCounts;
}

const maxMinusMinValue = (obj) => {
  const max = Math.max.apply(null, Object.values(obj));
  const min = Math.min.apply(null, Object.values(obj));
  return max - min;
}

const ruleCounts = countCharsForRules(20);

console.log('ruleCounts');
console.table(ruleCounts);

const transformedTemplate = transformString(template, 20);
const templateCount = countChars(transformedTemplate);

console.log('templateCount');
console.table(templateCount);

const len = transformedTemplate.length - 1;
const count = {};
Object.values(rules).forEach(rule => count[rule] = 0);
for (let i = 0; i < len; i++) {
  const key = `${transformedTemplate[i]}${transformedTemplate[i+1]}`;
  Object.keys(ruleCounts[key]).forEach(char => {
    count[char] += ruleCounts[key][char];
  })
}

Object.keys(count).forEach(char => {
  count[char] = count[char] - templateCount[char];
})
count[transformedTemplate[0]] += 1;
count[transformedTemplate[transformedTemplate.length - 1]] += 1;

console.log('transformedTemplateCount calculated');
console.table(count);

console.log('Part 1',
  maxMinusMinValue(
    countChars(
      transformString(template, 10)
    )
  )
);
console.log('Part 2', maxMinusMinValue(count));

