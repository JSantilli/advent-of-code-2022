
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

		A rock		X	1
		B paper		Y	2
		C scissors	Z	3

		*/

		/*

		Part 1:
		X = Rock
		Y = Paper
		Z = Scissors

		*/
		let partOneScores = {
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

		/*

		Part 2:
		X = lose
		Y = draw
		Z = win

		*/
		let partTwoScores = {
			"A X": 0 + 3,
			"A Y": 3 + 1,
			"A Z": 6 + 2,
			"B X": 0 + 1,
			"B Y": 3 + 2,
			"B Z": 6 + 3,
			"C X": 0 + 2,
			"C Y": 3 + 3,
			"C Z": 6 + 1,
		}

		let partOneTotalScore = 0;
		let partTwoTotalScore = 0;
		rl.on('line', (line) => {
			partOneTotalScore += partOneScores[line];
			partTwoTotalScore += partTwoScores[line];
		});

		await events.once(rl, 'close');

		// part 1
		console.log(partOneTotalScore);

		// part 2
		console.log(partTwoTotalScore);

	} catch (err) {
		console.log(err);
	}
}

processFile();
