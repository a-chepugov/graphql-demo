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

	result.get = (id) =>
		dbPromise.then((db) => {
				return db.all('SELECT id_one as idOne, id_two as idTwo FROM relations WHERE id_one = ? OR id_two = ?', id, id)
					.then((response) => {
						const all = response.reduce((a, {idOne, idTwo}) => {
							if (idOne != id) {
								a.add(idOne);
							}

							if (idTwo != id) {
								a.add(idTwo);
							}

							return a;
						}, new Set());
						return Array.from(all);
					})
			}
		);

	return result;
};
