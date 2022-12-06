
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

		const elfCalories = [];

		let currentElfCalories = 0;

		rl.on('line', (line) => {
			if (line) {
				currentElfCalories += parseInt(line);
			} else {
				// empty line
				elfCalories.push(currentElfCalories);
				currentElfCalories = 0;
			}
		});

		await events.once(rl, 'close');

		elfCalories.sort((a, b) => (b - a));

		// part 1, calories of elf carrying the most calories
		console.log(elfCalories[0]);

		// part 2, calories of top 3 elves total
		console.log(elfCalories[0] + elfCalories[1] + elfCalories[2]);

	} catch (err) {
		console.log(err);
	}
}

processFile();
