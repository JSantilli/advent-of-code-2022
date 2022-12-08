
const fs = require('fs');
const readline = require('readline');
const events = require('events');

async function processFile() {

	try {
		const fileStream = fs.createReadStream('input.txt');

		const rl = readline.createInterface({
			input: fileStream,
			crlfDelay: Infinity,
		});

		let pairsWithOneContained = 0;

		rl.on('line', (line) => {

			const splitPair = line.split(',');
			const firstSections = convertStringArrayToIntArray(splitPair[0].split('-'));
			const secondSections = convertStringArrayToIntArray(splitPair[1].split('-'));

			if (contains(firstSections, secondSections) || contains(secondSections, firstSections)) {
				pairsWithOneContained += 1;
			}
		});

		await events.once(rl, 'close');

		// part 1
		console.log(pairsWithOneContained);

		// part 2
		console.log('');

	} catch (err) {
		console.log(err);
	}
}

processFile();

function convertStringArrayToIntArray(stringArray) {
	const intArray = [];
	stringArray.forEach(string => {
		intArray.push(parseInt(string));
	});
	return intArray;
}

// Does sectionsA contain sectionsB?
function contains(sectionsA, sectionsB) {
	return sectionsA[0] <= sectionsB[0] && sectionsA[1] >= sectionsB[1];
}
