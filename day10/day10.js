
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

		let screenImage = [];

		rl.on('line', (line) => {

			const [instruction, param] = line.split(' ');
			const instructionValue = parseInt(param);
			
			const cyclesToAdd = instruction === 'noop' ? 1 : 2;

			for (let i = 0; i < cyclesToAdd; i++) {

				cycle++;

				if (cycle === 20 || cycle === 60 || cycle === 100 || cycle === 140 || cycle === 180 || cycle === 220) {
					totalSignalStrength += cycle * registerValue;
				}

				const cycleHorizontalPosition = (cycle - 1) % 40;

				if (cycleHorizontalPosition === registerValue - 1 || cycleHorizontalPosition === registerValue || cycleHorizontalPosition === registerValue + 1) {
					screenImage.push('#');
				} else {
					screenImage.push('.');
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
		console.log(screenImage.slice(0, 40).join(''));
		console.log(screenImage.slice(40, 80).join(''));
		console.log(screenImage.slice(80, 120).join(''));
		console.log(screenImage.slice(120, 160).join(''));
		console.log(screenImage.slice(160, 200).join(''));
		console.log(screenImage.slice(200, 240).join(''));

	} catch (err) {
		console.log(err);
	}
}

processFile();
