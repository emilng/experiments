// count the number of times the current number is greater than the previous number

const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'day01-1.txt'), { encoding: 'utf8' }).toString();

const numlist = data
	.split('\n')
	.map(num => parseInt(num, 0));

let increaseCount = 0;
let previousNum = NaN;

numlist.forEach(num => {
	if (num > previousNum) {
		increaseCount++;
	}
	previousNum = num;
});

console.log(increaseCount);