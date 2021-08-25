/*
The marketing team is spending way too much time typing in hashtags.
Let's help them with our own Hashtag Generator!

Here's the deal:

- It must start with a hashtag (#).
- All words must have their first letter capitalized.
- If the final result is longer than 140 chars it must return false.
- If the input or the result is an empty string it must return false.

Examples:

" Hello there thanks for trying my Kata"  =>  "#HelloThereThanksForTryingMyKata"
"    Hello     World   "                  =>  "#HelloWorld"
""                                        =>  false

*/

function generateHashtag (str) {
	if (str === '') return false;
	const removedSpaces = str
		.replace(/\s+/g, '.')
		.replace(/^\.|\.$/g, '');
	if (removedSpaces.length === 0) return false;
	const result = '#' + removedSpaces
		.split('.')
		.map(word => word[0].toUpperCase() + word.substring(1))
		.join('');
	return (result.length > 140) ? false : result;
}

function expect(input, output) {
	console.log('');
	console.log(input);
	console.log(output);
	console.log('');
}

expect(generateHashtag(' Hello there thanks for trying my Kata'), '#HelloThereThanksForTryingMyKata');
expect(generateHashtag('    Hello     World   '), '#HelloWorld');
expect(generateHashtag(''), false);
expect(generateHashtag(""), false, "Expected an empty string to return false")
expect(generateHashtag(" ".repeat(200)), false, "Still an empty string")
expect(generateHashtag("Do We have A Hashtag"), "#DoWeHaveAHashtag", "Expected a Hashtag (#) at the beginning.")
expect(generateHashtag("Codewars"), "#Codewars", "Should handle a single word.")
expect(generateHashtag("Codewars Is Nice"), "#CodewarsIsNice", "Should remove spaces.")
expect(generateHashtag("Codewars is nice"), "#CodewarsIsNice", "Should capitalize first letters of words.")
expect(generateHashtag("code" + " ".repeat(140) + "wars"), "#CodeWars")
expect(generateHashtag("Looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong Cat"), false, "Should return false if the final word is longer than 140 chars.")
expect(generateHashtag("a".repeat(139)), "#A" + "a".repeat(138), "Should work")
expect(generateHashtag("a".repeat(140)), false, "Too long")