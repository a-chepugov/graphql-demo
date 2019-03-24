const schema = `
CREATE TABLE IF NOT EXISTS persons (
	id INTEGER PRIMARY KEY,
	name TEXT NOT NULL,
	sex INTEGER NOT NULL,
	birthdate INTEGER NOT NULL,
	city_id INTEGER NOT NULL
);
`;

module.exports = (dbPromise) => {
	const result = {};

	result.init = () => dbPromise.then((db) => db.run(schema));

	result.drop = () => dbPromise.then((db) => db.run('DROP TABLE IF EXISTS persons'));

	result.create = (data) =>
		dbPromise.then((db) =>
			db.run(
				'INSERT OR IGNORE INTO persons (id, name, sex, birthdate, city_id) VALUES (?, ?, ?, ?, ?)',
				data.id, data.name, data.sex, data.birthdate, data.cityId));


	result.get = (id) =>
		dbPromise.then((db) => {
				return db.get('SELECT * FROM persons WHERE id = ?', id)
			}
		);

	result.getMany = (ids) =>
		dbPromise.then((db) => {
				return db.all(`SELECT * FROM persons WHERE id in (${ids.join(',')})`)
			}
		);

	result.getInCity = (id, limit = 5) =>
		dbPromise.then((db) => {
				return db.all('SELECT * FROM persons WHERE city_id = ? LIMIT ?', id, limit)
			}
		);


	return result;
};
