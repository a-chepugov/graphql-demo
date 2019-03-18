const schema = `
CREATE TABLE IF NOT EXISTS cities (
	id INTEGER PRIMARY KEY,
	name TEXT NOT NULL,
	code TEXT NOT NULL
);
`;

module.exports = (dbPromise) => {
	const result = {};

	result.init = () => dbPromise.then((db) => db.run(schema));

	result.create = (data) =>
		dbPromise.then((db) =>
			db.run(
				'INSERT OR IGNORE INTO cities (id, name, code) VALUES (?, ?, ?)',
				data.id, data.name, data.code));

	return result;
};
