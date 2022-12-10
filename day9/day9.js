
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

		const headPosition = [0, 0];
		const tailPosition = [0, 0];

		const tailPositions = new Set();
		tailPositions.add(tailPosition.toString());

		function moveHead(direction) {
			
			if (direction === 'U') {
				headPosition[1]++;
			}

			if (direction === 'D') {
				headPosition[1]--;
			}

			if (direction === 'L') {
				headPosition[0]--;
			}

			if (direction === 'R') {
				headPosition[0]++;
			}
		}

		function moveTail() {
			
			const positionDiff = [headPosition[0] - tailPosition[0], headPosition[1] - tailPosition[1]];

			if (Math.abs(positionDiff[0]) === 2) {
				const movement = positionDiff[0] / Math.abs(positionDiff[0]);
				tailPosition[0] += movement;
				if (Math.abs(positionDiff[1]) === 1) {
					tailPosition[1] += positionDiff[1];
				}
			}

			if (Math.abs(positionDiff[1]) === 2) {
				const movement = positionDiff[1] / Math.abs(positionDiff[1]);
				tailPosition[1] += movement;
				if (Math.abs(positionDiff[0]) === 1) {
					tailPosition[0] += positionDiff[0];
				}
			}

			tailPositions.add(tailPosition.toString());
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

		console.log(tailPositions);

		// part 1
		console.log(tailPositions.size);

		// part 2
		console.log('');

	} catch (err) {
		console.log(err);
	}
}

processFile();
