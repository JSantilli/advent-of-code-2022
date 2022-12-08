
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

		// Assuming 9 stacks
		// Assuming lines 1-8 describe crates
		// Assuming line 9 is the stack number labels
		// Assuming line 10 is an empty line

		let lineCount = 0;

		const stacks = {
			'1': [],
			'2': [],
			'3': [],
			'4': [],
			'5': [],
			'6': [],
			'7': [],
			'8': [],
			'9': [],
		};

		rl.on('line', (line) => {
			lineCount += 1;
			
			if (lineCount < 9) {
				// create stacks of crates

				const rowChars = line.split('');

				for (let index = 1, crate = 1; index < rowChars.length; index += 4, crate += 1) {
					if (rowChars[index] !== ' ') {
						stacks[crate].unshift(rowChars[index]);
					}
				}

			} else if (lineCount < 11) {
				// ignore, crate labels and empty line
			} else {
				// move crates

				const instructionTokens = line.split(' ');

				const iterations = instructionTokens.at(1);
				const fromStack = instructionTokens.at(3);
				const toStack = instructionTokens.at(5);

				for (let index = 0; index < iterations; index++) {
					stacks[toStack].push(stacks[fromStack].pop());
				}
			}
		});

		await events.once(rl, 'close');

		const topString =
			stacks["1"].at(stacks["1"].length - 1) +
			stacks["2"].at(stacks["2"].length - 1) +
			stacks["3"].at(stacks["3"].length - 1) +
			stacks["4"].at(stacks["4"].length - 1) +
			stacks["5"].at(stacks["5"].length - 1) +
			stacks["6"].at(stacks["6"].length - 1) +
			stacks["7"].at(stacks["7"].length - 1) +
			stacks["8"].at(stacks["8"].length - 1) +
			stacks["9"].at(stacks["9"].length - 1);

		// part 1
		console.log(topString);

		// part 2
		console.log('');

	} catch (err) {
		console.log(err);
	}
}

processFile();
