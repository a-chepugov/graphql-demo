const schema = `
CREATE TABLE IF NOT EXISTS persons (
	id INTEGER PRIMARY KEY,
	name TEXT NOT NULL,
	birthdate INTEGER NOT NULL,
	phone TEXT NOT NULL,
	city_id INTEGER NOT NULL
);
`;

module.exports = (dbPromise) => {
	const result = {};

	result.init = () => dbPromise.then((db) => db.run(schema));

	result.create = (data) =>
		dbPromise.then((db) =>
			db.run(
				'INSERT OR IGNORE INTO persons (id, name, birthdate, phone, city_id) VALUES (?, ?, ?, ?, ?)',
				data.id, data.name, data.birthdate, data.phone, data.cityId));

	return result;
};
