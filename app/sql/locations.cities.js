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

	result.drop = () => dbPromise.then((db) => db.run('DROP TABLE IF EXISTS cities'));

	result.create = (data) =>
		dbPromise.then((db) =>
			db.run(
				'INSERT OR IGNORE INTO cities (id, name, code) VALUES (?, ?, ?)',
				data.id, data.name, data.code));


	result.get = (id) =>
		dbPromise.then((db) => {
			return db.get('SELECT * FROM cities WHERE id = ?', id)
		});

	return result;
};


