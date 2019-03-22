const schema = `
CREATE TABLE IF NOT EXISTS birds (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT NOT NULL,
	color TEXT NOT NULL,
	sex INTEGER NOT NULL,
 	family TEXT NOT NULL
);
`;

module.exports = (dbPromise) => {
	const result = {};

	result.init = () => dbPromise.then((db) => db.run(schema));

	result.drop = () => dbPromise.then((db) => db.run('DROP TABLE IF EXISTS birds;'));

	result.create = (data) =>
		dbPromise.then((db) =>
			db.run(
				'INSERT OR IGNORE INTO birds (name, color, sex, family) VALUES (?, ?, ?, ?)',
				data.name, data.color, data.sex, data.family)
		)

	result.get = (id) =>
		dbPromise.then((db) => {
				return db.get('SELECT * FROM birds WHERE id = ?', id)
			}
		);

	return result;
};
