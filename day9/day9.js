
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

		const ropePositions = [
			[0, 0], // H
			[0, 0], // 1
			[0, 0], // 2
			[0, 0], // 3
			[0, 0], // 4
			[0, 0], // 5
			[0, 0], // 6
			[0, 0], // 7
			[0, 0], // 8
			[0, 0], // 9
		];

		const tailPositions = new Set();
		tailPositions.add(ropePositions[ropePositions.length - 1].toString());

		function moveHead(direction) {

			if (direction === 'U') {
				ropePositions[0][1]++;
			}

			if (direction === 'D') {
				ropePositions[0][1]--;
			}

			if (direction === 'L') {
				ropePositions[0][0]--;
			}

			if (direction === 'R') {
				ropePositions[0][0]++;
			}
		}

		function moveTail() {

			for (let i = 1; i < ropePositions.length; i++) {
				const ropeToMove = ropePositions[i];
				const ropeToFollow = ropePositions[i - 1];

				const positionDiff = [ropeToFollow[0] - ropeToMove[0], ropeToFollow[1] - ropeToMove[1]];

				if (Math.abs(positionDiff[0]) === 2) {
					const movement = positionDiff[0] / Math.abs(positionDiff[0]);
					ropeToMove[0] += movement;
					if (Math.abs(positionDiff[1]) === 1) {
						ropeToMove[1] += positionDiff[1];
					}
				}

				if (Math.abs(positionDiff[1]) === 2) {
					const movement = positionDiff[1] / Math.abs(positionDiff[1]);
					ropeToMove[1] += movement;
					if (Math.abs(positionDiff[0]) === 1) {
						ropeToMove[0] += positionDiff[0];
					}
				}
			}

			tailPositions.add(ropePositions[ropePositions.length - 1].toString());
		}

		rl.on('line', (line) => {

			const [direction, countStr] = line.split(' ');
			const count = parseInt(countStr);

			for (let i = 0; i < count; i++) {
				moveHead(direction);
				moveTail();
			}

		});

		await events.once(rl, 'close');

		// part 2
		console.log(tailPositions.size);

	} catch (err) {
		console.log(err);
	}
}

processFile();
