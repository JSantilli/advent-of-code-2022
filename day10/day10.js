
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

		let registerValue = 1;
		let cycle = 0;

		let totalSignalStrength = 0;

		rl.on('line', (line) => {

			const [instruction, param] = line.split(' ');
			const instructionValue = parseInt(param);
			
			const cyclesToAdd = instruction === 'noop' ? 1 : 2;

			for (let i = 0; i < cyclesToAdd; i++) {
				cycle++;
				if (cycle === 20 || cycle === 60 || cycle === 100 || cycle === 140 || cycle === 180 || cycle === 220) {
					totalSignalStrength += cycle * registerValue;
				}
			}

			if (instruction === 'addx') {
				registerValue += instructionValue;
			}
		});

		await events.once(rl, 'close');

		// part 1
		console.log(totalSignalStrength);

		// part 2
		console.log('');

	} catch (err) {
		console.log(err);
	}
}

processFile();
