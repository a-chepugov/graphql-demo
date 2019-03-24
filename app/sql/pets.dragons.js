const schema = `
CREATE TABLE IF NOT EXISTS dragons (
	id INTEGER PRIMARY KEY,
	name TEXT NOT NULL,
	sex INTEGER NOT NULL,
	superpower TEXT NOT NULL
);
`;

module.exports = (dbPromise) => {
	const result = {};

	result.init = () => dbPromise.then((db) => db.run(schema));

	result.drop = () => dbPromise.then((db) => db.run('DROP TABLE IF EXISTS dragons'));

	result.create = (data) =>
		dbPromise.then((db) =>
			db.run(
				'INSERT OR IGNORE INTO dragons (id, name, sex, superpower) VALUES (?, ?, ?, ?)',
				data.id, data.name, data.sex, data.superpower));

	result.get = (id) =>
		dbPromise.then((db) => {
				return db.get('SELECT * FROM dragons WHERE id = ?', id)
			}
		);

	return result;
};
