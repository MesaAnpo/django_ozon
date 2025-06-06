const fs = require('fs');

process.stdin.setEncoding('utf8');

let data = '';

process.stdin.on('data', chunk => {
	data += chunk;
});

process.stdin.on('end', () => {
	try {
		const input = JSON.parse(data);
		const fakeResult = {
		status: 'ok',
		query: input.query || 'не задано',
		minPrice: input.minPrice || null,
		maxPrice: input.maxPrice || null,
		color: input.color || 'любой',
		items: [
			{ id: 1, name: "Товар 1", price: 34999 },
			{ id: 2, name: "Товар 2", price: 78999 },
		]
	};

	process.stdout.write(JSON.stringify(fakeResult));
	} catch (error) {
		process.stderr.write(`Ошибка: ${error.message}`);
		process.exit(1);
	}
});