/*
function sumDigPow(a, b) {
  let lookup = {};
  let nums = [];
  for (let i = a; i <= b; i++) {
    let sum = 0;
    const digits = `${i}`.split('');
    for (let j = 0; j < digits.length; j++) {
      const ref = `${digits[j]}-${j + 1}`;
      let val = lookup[ref];
      if (!val) {
        val = (+digits[j]) ** (j + 1);
        lookup[ref] = val;
      }
      sum += val;
      if (sum === i) nums.push(sum);
    }
  }
  return nums;
}
*/

function sumDigPow(a, b) {
  let nums = [];
  for (let i = a; i <= b; i++) {
    let sum = 0;
    `${i}`
      .split('')
      .forEach((digit, index) => {
        const val = (+digit) ** (index + 1);
        sum += val;
        if (sum === i) nums.push(sum);
      })
  }
  return nums;
}


console.log(sumDigPow(1, 1000));