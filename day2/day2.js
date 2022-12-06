
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

		/*
		Part 1 scoring

		A rock		X	1
		B paper		Y	2
		C scissors	Z	3

		*/
		scores = {
			"A X": 3 + 1,
			"A Y": 6 + 2,
			"A Z": 0 + 3,
			"B X": 0 + 1,
			"B Y": 3 + 2,
			"B Z": 6 + 3,
			"C X": 6 + 1,
			"C Y": 0 + 2,
			"C Z": 3 + 3,
		}

		let totalScore = 0;
		rl.on('line', (line) => {
			totalScore += scores[line];
		});

		await events.once(rl, 'close');

		// part 1, total score
		console.log(totalScore);

	} catch (err) {
		console.log(err);
	}
}

processFile();
