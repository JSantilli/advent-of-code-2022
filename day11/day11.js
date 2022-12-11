
function runSimulation() {

	try {

		const monkeys = [
			{ // 0
				startingItems: [62, 92, 50, 63, 62, 93, 73, 50],
				operation: function (old) {
					return old * 7;
				},
				test: function (item) {
					if (item % 2 === 0) {
						return 7;
					} else {
						return 1;
					}
				},
				inspections: 0
			},
			{ // 1
				startingItems: [51, 97, 74, 84, 99],
				operation: function (old) {
					return old + 3;
				},
				test: function (item) {
					if (item % 7 === 0) {
						return 2;
					} else {
						return 4;
					}
				},
				inspections: 0
			},
			{ // 2
				startingItems: [98, 86, 62, 76, 51, 81, 95],
				operation: function (old) {
					return old + 4;
				},
				test: function (item) {
					if (item % 13 === 0) {
						return 5;
					} else {
						return 4;
					}
				},
				inspections: 0
			},
			{ // 3
				startingItems: [53, 95, 50, 85, 83, 72],
				operation: function (old) {
					return old + 5;
				},
				test: function (item) {
					if (item % 19 === 0) {
						return 6;
					} else {
						return 0;
					}
				},
				inspections: 0
			},
			{ // 4
				startingItems: [59, 60, 63, 71],
				operation: function (old) {
					return old * 5;
				},
				test: function (item) {
					if (item % 11 === 0) {
						return 5;
					} else {
						return 3;
					}
				},
				inspections: 0
			},
			{ // 5
				startingItems: [92, 65],
				operation: function (old) {
					return old * old;
				},
				test: function (item) {
					if (item % 5 === 0) {
						return 6;
					} else {
						return 3;
					}
				},
				inspections: 0
			},
			{ // 6
				startingItems: [78],
				operation: function (old) {
					return old + 8;
				},
				test: function (item) {
					if (item % 3 === 0) {
						return 0;
					} else {
						return 7;
					}
				},
				inspections: 0
			},
			{ // 7
				startingItems: [84, 93, 54],
				operation: function (old) {
					return old + 1;
				},
				test: function (item) {
					if (item % 17 === 0) {
						return 2;
					} else {
						return 1;
					}
				},
				inspections: 0
			},
		];

		for (let round = 0; round < 20; round++) {

			monkeys.forEach(monkey => {
				while (monkey.startingItems.length > 0) {
					let item = monkey.startingItems.shift();
					item = monkey.operation(item);
					item = Math.floor(item / 3);
					let monkeyNumber = monkey.test(item);
					monkeys[monkeyNumber].startingItems.push(item);
					monkey.inspections++;
				}
			});
		}

		monkeys.sort((a, b) => b.inspections - a.inspections);

		// part 1
		console.log(monkeys[0].inspections * monkeys[1].inspections);

		// part 2
		console.log('');

	} catch (err) {
		console.log(err);
	}
}

runSimulation();
