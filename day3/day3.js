
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

		let totalPriority = 0;
		rl.on('line', (line) => {
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

		});

		await events.once(rl, 'close');

		// part 1
		console.log(totalPriority);

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
