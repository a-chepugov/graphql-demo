const sqlite = require('sqlite');

let dbs = new Map();

module.exports = (file = ':memory:') => {
	if (dbs.has(file)) {
		return dbs.get(file);
	} else {
		const db = sqlite.open(file, {Promise});
		dbs.set(file, db);
		return db;
	}
};
