
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

				const fileSize = parseInt(lineTokens[0]);
				currentDirectory.sizeOfFiles += fileSize;

			}
		});

		await events.once(rl, 'close');

		const directories = [];

		function calculateDirectorySize(dir) {
			const dirSize = dir.sizeOfFiles + dir.childDirs.reduce((acc, subDir) => acc + calculateDirectorySize(subDir), 0);
			directories.push(dirSize);
			return dirSize;
		}

		const totalFilesystemSize = calculateDirectorySize(root);

		let totalSizeOfDirsAtMost100k = 0;

		directories.forEach(dir => {
			if (dir <= 100000) {
				totalSizeOfDirsAtMost100k += dir;
			}
		});

		// part 1
		console.log(totalSizeOfDirsAtMost100k);

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
