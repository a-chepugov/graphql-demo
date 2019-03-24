const schema = `
CREATE TABLE IF NOT EXISTS fishes (
	id INTEGER PRIMARY KEY,
	name TEXT NOT NULL,
	sex INTEGER NOT NULL,
	ecotype TEXT NOT NULL
);
`;

module.exports = (dbPromise) => {
	const result = {};

	result.init = () => dbPromise.then((db) => db.run(schema));

	result.drop = () => dbPromise.then((db) => db.run('DROP TABLE IF EXISTS fishes'));

	result.create = (data) =>
		dbPromise.then((db) =>
			db.run(
				'INSERT OR IGNORE INTO fishes (id, name, sex, ecotype) VALUES (?, ?, ?, ?)',
				data.id, data.name, data.sex, data.ecotype));

	result.get = (id) =>
		dbPromise.then((db) => {
				return db.get('SELECT * FROM fishes WHERE id = ?', id)
			}
		);

	return result;
};
