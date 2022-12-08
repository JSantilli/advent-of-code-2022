
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

		const stacks_9000 = {
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

		const stacks_9001 = {
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
						stacks_9000[crate].unshift(rowChars[index]);
						stacks_9001[crate].unshift(rowChars[index]);
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
					stacks_9000[toStack].push(stacks_9000[fromStack].pop());
				}

				stacks_9001[toStack].push(...stacks_9001[fromStack].splice(-iterations, iterations));
			}
		});

		await events.once(rl, 'close');

		const topString_9000 =
			stacks_9000["1"].at(stacks_9000["1"].length - 1) +
			stacks_9000["2"].at(stacks_9000["2"].length - 1) +
			stacks_9000["3"].at(stacks_9000["3"].length - 1) +
			stacks_9000["4"].at(stacks_9000["4"].length - 1) +
			stacks_9000["5"].at(stacks_9000["5"].length - 1) +
			stacks_9000["6"].at(stacks_9000["6"].length - 1) +
			stacks_9000["7"].at(stacks_9000["7"].length - 1) +
			stacks_9000["8"].at(stacks_9000["8"].length - 1) +
			stacks_9000["9"].at(stacks_9000["9"].length - 1);

		const topString_9001 =
			stacks_9001["1"].at(stacks_9001["1"].length - 1) +
			stacks_9001["2"].at(stacks_9001["2"].length - 1) +
			stacks_9001["3"].at(stacks_9001["3"].length - 1) +
			stacks_9001["4"].at(stacks_9001["4"].length - 1) +
			stacks_9001["5"].at(stacks_9001["5"].length - 1) +
			stacks_9001["6"].at(stacks_9001["6"].length - 1) +
			stacks_9001["7"].at(stacks_9001["7"].length - 1) +
			stacks_9001["8"].at(stacks_9001["8"].length - 1) +
			stacks_9001["9"].at(stacks_9001["9"].length - 1);

		// part 1
		console.log(topString_9000);

		// part 2
		console.log(topString_9001);

	} catch (err) {
		console.log(err);
	}
}

processFile();
