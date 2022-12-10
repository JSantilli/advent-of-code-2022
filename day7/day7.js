
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

		const root = createDirectory('/', null);

		let currentDirectory;

		rl.on('line', (line) => {

			const lineTokens = line.split(' ');
			
			// commands
			if (lineTokens[0] === '$') {

				if (lineTokens[1] === 'cd') {
					if (lineTokens[2] === '..') {
						currentDirectory = currentDirectory.parent;
					} else {
						if (lineTokens[2] === '/') {
							currentDirectory = root;
						} else {
							currentDirectory = currentDirectory.childDirs.find(dir => dir.name === lineTokens[2]);
						}
					}
				}

			} else if (lineTokens[0] === 'dir') {

				currentDirectory.childDirs.push(createDirectory(lineTokens[1], currentDirectory));
			
			} else {

				currentDirectory.sizeOfFiles += parseInt(lineTokens[0]);

			}
		});

		await events.once(rl, 'close');

		// part 1
		console.log('');

		// part 2
		console.log('');

	} catch (err) {
		console.log(err);
	}
}

processFile();

function createDirectory(name, parent) {
	
	return {
		name: name,
		parent: parent,
		sizeOfFiles: 0,
		childDirs: [],
	}
}
