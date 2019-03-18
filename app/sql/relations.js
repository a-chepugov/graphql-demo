const schema = `
CREATE TABLE IF NOT EXISTS relations (
	id_one INTEGER NOT NULL,
	id_two INTEGER NOT NULL
);
`;

module.exports = (dbPromise) => {
	const result = {};

	result.init = () => dbPromise.then((db) => db.run(schema));

	result.drop = () => dbPromise.then((db) => db.run('DROP TABLE IF EXISTS relations'));

	result.create = (idOne, idTwo) => dbPromise.then((db) =>
		db.run('INSERT OR IGNORE INTO relations (id_one, id_two) VALUES (?, ?)', idOne, idTwo));

	return result;
};
