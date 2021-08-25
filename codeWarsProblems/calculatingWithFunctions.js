/*
	Test.assertEquals(seven(times(five())), 35);
	Test.assertEquals(four(plus(nine())), 13);
	Test.assertEquals(eight(minus(three())), 5);
	Test.assertEquals(six(dividedBy(two())), 3);
*/

function number(num, op) {
	return (op) ? op(num) : num;
}

function operator(op, num1) {
	function operate(op, num2, num1) {
		switch (op) {
			case '+': return num1 + num2;
			case '-': return num1 - num2;
			case '*': return num1 * num2;
			case '/': return Math.floor(num1 / num2);
		}
	}
	return operate.bind(this, op, num1);
}

function zero(op) { return number(0, op); }
function one(op) { return number(1, op); }
function two(op) { return number(2, op); }
function three(op) { return number(3, op); }
function four(op) { return number(4, op); }
function five(op) { return number(5, op); }
function six(op) { return number(6, op); }
function seven(op) { return number(7, op); }
function eight(op) { return number(8, op); }
function nine(op) { return number(9, op); }

function plus(num) { return operator('+', num); }
function minus(num) { return operator('-', num); }
function times(num) { return operator('*', num); }
function dividedBy(num) { return operator('/', num); }

console.log(seven(times(five())), 35);
console.log(four(plus(nine())), 13);
console.log(eight(minus(three())), 5);
console.log(six(dividedBy(two())), 3);
