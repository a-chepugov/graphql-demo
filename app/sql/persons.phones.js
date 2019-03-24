const schema = `
CREATE TABLE IF NOT EXISTS phones (
	id INTEGER PRIMARY KEY,
	owner_id  INTEGER ,
	value TEXT NOT NULL
);
`;

module.exports = (dbPromise) => {
	const result = {};

	result.init = () => dbPromise.then((db) => db.run(schema));

	result.drop = () => dbPromise.then((db) => db.run('DROP TABLE IF EXISTS phones'));

	result.create = (data) =>
		dbPromise.then((db) =>
			db.run(
				'INSERT OR IGNORE INTO phones (id, owner_id, value) VALUES (?, ?, ?)',
				data.id, data.owner_id, data.value));


	result.get = (id) =>
		dbPromise.then((db) => {
				return db.get('SELECT * FROM phones WHERE id = ?', id)
			}
		);

	result.getByOwnerId = (id) =>
		dbPromise.then((db) => {
				return db.all('SELECT * FROM phones WHERE owner_id = ?', id)
			}
		);

	return result;
};
