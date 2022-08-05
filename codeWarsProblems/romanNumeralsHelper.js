/*

Symbol 	Value
	I				1
	IV			4
	V				5
	X				10
	L				50
	C				100
	D				500
	M				1000

*/

const RomanNumerals = {
	numList: [ 1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1 ],
	numTable: { 1000: 'M', 900: 'CM', 500: 'D', 400: 'CD', 100: 'C', 90: 'XC', 50: 'L', 40: 'XL', 10: 'X', 9: 'IX', 5: 'V', 4: 'IV', 1: 'I', },
	numeralList: [ 'M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I', ],
	numeralTable: { 'M': 1000, 'CM': 900, 'D': 500, 'CD': 400, 'C': 100, 'XC': 90, 'L': 50, 'XL': 40, 'X': 10, 'IX': 9, 'V': 5, 'IV': 4, 'I': 1 },
  toRoman(decimal) {
  	let remainder = decimal;
  	let numerals = '';
  	let i = 0;
  	while (remainder > 0) {
  		const num = this.numList[i];
  		if (remainder >= num) {
				const charCount = (this.numTable[num].length === 2) ? 1 : Math.floor( remainder / num );
				remainder = remainder - (charCount * num);
				numerals = numerals + this.numTable[num].repeat(charCount);
  		}
  		i++;
  	}
  	return numerals;
  },
  fromRoman(numerals) {
  	let remainingNumerals = numerals;
  	let sum = 0;
  	let i = 0;
  	while (remainingNumerals.length > 0) {
  		const oldNumeralsLength = remainingNumerals.length;
  		const currentNumeral = this.numeralList[i];
  		const numeralValue = this.numeralTable[currentNumeral];
  		remainingNumerals = remainingNumerals.replace(new RegExp(`^${currentNumeral}+`), '');
  		sum = sum + ((oldNumeralsLength - remainingNumerals.length) / currentNumeral.length) * numeralValue;
  		i++;
  	}
  	return sum;
  },
};

function expect(input, output) {
  console.log('');
  console.log(input);
  console.log(output);
  console.log(input === output);
  console.log('');
}

expect(RomanNumerals.toRoman(1000), 'M');
expect(RomanNumerals.toRoman(999), "CMXCIX");
expect(RomanNumerals.toRoman(4), 'IV');
expect(RomanNumerals.toRoman(1), 'I');
expect(RomanNumerals.toRoman(1991), 'MCMXCI');
expect(RomanNumerals.toRoman(2006), 'MMVI');
expect(RomanNumerals.toRoman(2020), 'MMXX');

expect(RomanNumerals.fromRoman('XXI'), 21);
expect(RomanNumerals.fromRoman('I'), 1);
expect(RomanNumerals.fromRoman('III'), 3);
expect(RomanNumerals.fromRoman('IV'), 4);
expect(RomanNumerals.fromRoman('MMVII'), 2007);
expect(RomanNumerals.fromRoman('MDCLXIX'), 1669);