const schema = `
CREATE TABLE IF NOT EXISTS ownership (
	id INTEGER,
	owner_id INTEGER,
	__typename INTEGER
);
`;

module.exports = (dbPromise) => {
	const result = {};

	result.init = () => dbPromise.then((db) => db.run(schema));

	result.drop = () => dbPromise.then((db) => db.run('DROP TABLE IF EXISTS ownership'));

	result.create = (data) =>
		dbPromise.then((db) =>
			db.run(
				'INSERT OR IGNORE INTO ownership (id, owner_id, __typename) VALUES (?, ?, ?)',
				data.id, data.owner_id, data.__typename));

	result.get = (owner_id) =>
		dbPromise.then((db) => {
				return db.all('SELECT * FROM ownership WHERE owner_id = ?', owner_id)
			}
		);

	return result;
};
