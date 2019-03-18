const mocks = require('../../mocks');

const persons = () => {
	const db = require('./init')('./persons.sqlite');

	const persons = require('./persons')(db);
	const relations = require('./relations')(db);

	// persons.init()
	// 	.then(() => Promise.all(
	// 		mocks.persons.map((item) => persons.create(item))));
	//
	// relations.drop()
	// 	.then(() => relations.init())
	// 	.then(() =>
	// 		Promise.all(
	// 			mocks.persons.map(({id, relations: relationsIds}) =>
	// 				Promise.all(
	// 					relationsIds.map((anotherId) => relations.create(id, anotherId)))
	// 			))
	// 	);

	return db;
};


const cities = () => {
	const db = require('./init')('./cities.sqlite');

	const cities = require('./cities')(db);
	cities.init()
		.then((() =>
			Promise.all(
				mocks.cities.map((item) => cities.create(item))
			)));

	return db;
};

module.exports = {
	cities: cities(),
	persons: persons(),
};
