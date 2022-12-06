
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

		// part 1
		let totalPriority = 0;

		// part 2
		let elfCount = 0;
		let elfGroupCommonCharsSet = null;
		let totalBadgePriority = 0;

		rl.on('line', (line) => {

			elfCount += 1;

			const firstHalf = line.slice(0, line.length / 2);
			const secondHalf = line.slice(line.length / 2);

			const firstHalfCharSet = new Set(firstHalf.split(''));
			const secondHalfCharSet = new Set(secondHalf.split(''));

			let duplicateChar = '';
			for (const char of firstHalfCharSet) {
				if (secondHalfCharSet.has(char)) {
					duplicateChar = char;
					totalPriority += getPriorityOfItem(char);
					break;
				}
			}

			// 1st elf in group
			// add all chars to set

			// create currentSet from this line
			// loop over commonSet
				// if char in commonSet not in currentSet
					// remove char from commonSet

			if (elfCount % 3 === 1) {
				elfGroupCommonCharsSet = new Set(line.split(''));
			} else {
				const currentElfCharSet = new Set(line.split(''));

				for (const char of elfGroupCommonCharsSet) {
					if (!currentElfCharSet.has(char)) {
						elfGroupCommonCharsSet.delete(char);
					}
				}
			}

			if (elfCount % 3 === 0) {

				// common set should now only contain the one character common to all 3 elves
				totalBadgePriority += getPriorityOfItem(Array.from(elfGroupCommonCharsSet.values())[0]);

				elfGroupCommonCharsSet = null;
			}

		});

		await events.once(rl, 'close');

		// part 1
		console.log(totalPriority);

		// part 2
		console.log(totalBadgePriority);

	} catch (err) {
		console.log(err);
	}
}

processFile();

function getPriorityOfItem(item) {
	if (item === item.toUpperCase()) {
		return item.charCodeAt() - 38;
	} else {
		return item.charCodeAt() - 96;
	}
}
