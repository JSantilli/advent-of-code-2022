
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

		rl.on('line', (line) => {

		});

		await events.once(rl, 'close');

		// part 1
		console.log('');

		// part 2
		console.log('');

	} catch (err) {
		console.log(err);
	}
}

processFile();
