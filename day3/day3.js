
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
