
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

		const grid = [];

		rl.on('line', (line) => {
			grid.push(line.split('').map(x => parseInt(x)));
		});

		await events.once(rl, 'close');

		let numberOfVisibleTrees = 0;

		for (let i = 0; i < grid.length; i++) {
			for (let j = 0; j < grid[i].length; j++) {
				if (isVisible(grid, i, j)) {
					numberOfVisibleTrees += 1;
				}
			}
		}

		// part 1
		console.log(numberOfVisibleTrees);

		// part 2
		console.log('');

	} catch (err) {
		console.log(err);
	}
}

processFile();

function isVisible(grid, row, col) {

	const maxIndex = 98;
	const treeToCheck = grid[row][col];

	if (row === 0 || row === maxIndex) {
		return true;
	}

	if (col === 0 || col === maxIndex) {
		return true;
	}

	// left
	let isVisibleLeft = true;
	for (let i = 0; i < col; i++) {
		if (grid[row][i] >= treeToCheck) {
			isVisibleLeft = false;
			break;
		}
	}
	if (isVisibleLeft) {
		return true;
	}

	// right
	let isVisibleRight = true;
	for (let i = col + 1; i < maxIndex + 1; i++) {
		if (grid[row][i] >= treeToCheck) {
			isVisibleRight = false;
			break;
		}
	}
	if (isVisibleRight) {
		return true;
	}

	// up
	let isVisibleUp = true;
	for (let i = 0; i < row; i++) {
		if (grid[i][col] >= treeToCheck) {
			isVisibleUp = false;
			break;
		}
	}
	if (isVisibleUp) {
		return true;
	}

	// down
	let isVisibleDown = true;
	for (let i = row + 1; i < maxIndex + 1; i++) {
		if (grid[i][col] >= treeToCheck) {
			isVisibleDown = false;
			break;
		}
	}
	if (isVisibleDown) {
		return true;
	}

	return false;
}
