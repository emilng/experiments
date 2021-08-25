/*
Complete the solution so that it strips all text that follows
any of a set of comment markers passed in. Any whitespace at the
end of the line should also be stripped out.

Given:
apples, pears # and bananas
grapes
bananas !apples

Expected:
apples, pears
grapes
bananas

*/

function solution(input, markers) {
	const escapedMarkers = markers.map(marker => {
		return marker.match(/\+\*\?\^\$\\\.\[\]\{\}\(\)\|\/\//) ? `\${marker}` : marker;
	}).join('|');
	const comments = new RegExp(`[${escapedMarkers}].*`, 'gm');
	const trailingWhitespace = /\s+$/gm;
	return input
		.replace(comments, '')
		.replace(trailingWhitespace, '');
};

function expect(input, output) {
	console.log(input.replace(/\x20/gm, '.'));
	console.log('******');
	console.log(output.replace(/\x20/gm, '.'));
}

expect(solution('apples, plums % and bananas\npears\noranges !applesauce', ['%', '!']), 'apples, plums\npears\noranges');
expect(solution('Q @b\nu\ne -e f g', ['@', '-']), 'Q\nu\ne');


