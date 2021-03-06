const schema = `
CREATE TABLE IF NOT EXISTS dogs (
	id INTEGER PRIMARY KEY,
	name TEXT NOT NULL,
	sex INTEGER NOT NULL,
	training TEXT NOT NULL
);
`;

module.exports = (dbPromise) => {
	const result = {};

	result.init = () => dbPromise.then((db) => db.run(schema));

	result.drop = () => dbPromise.then((db) => db.run('DROP TABLE IF EXISTS dogs'));

	result.create = (data) =>
		dbPromise.then((db) =>
			db.run(
				'INSERT OR IGNORE INTO dogs (id, name, sex, training) VALUES (?, ?, ?, ?)',
				data.id, data.name, data.sex, data.training));

	result.get = (id) =>
		dbPromise.then((db) => {
				return db.get('SELECT * FROM dogs WHERE id = ?', id)
			}
		);

	return result;
};
