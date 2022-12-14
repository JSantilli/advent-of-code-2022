
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

		let startOfPacketMarkerCharacter = -1;
		let startofMessageMarkerCharacter = -1;

		rl.on('line', (line) => {
			const characters = line.split('');
			
			for (let index = 0; index < characters.length - 3; index++) {
				const bufferSlice = characters.slice(index, index + 4);
				
				if (new Set(bufferSlice).size === 4) {
					// we have a unique buffer slice
					startOfPacketMarkerCharacter = index + 4;
					break;
				}
			}

			for (let index = 0; index < characters.length - 13; index++) {
				const bufferSlice = characters.slice(index, index + 14);
				
				if (new Set(bufferSlice).size === 14) {
					// we have a unique buffer slice
					startofMessageMarkerCharacter = index + 14;
					break;
				}
			}
		});

		await events.once(rl, 'close');

		// part 1
		console.log(startOfPacketMarkerCharacter);

		// part 2
		console.log(startofMessageMarkerCharacter);

	} catch (err) {
		console.log(err);
	}
}

processFile();
