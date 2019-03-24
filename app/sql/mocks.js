const mocks = require('../../mocks');

const cities = () => {
	const dbPromise = require('./init')('./dbs/locations.sqlite');

	const cities = require('./locations.cities')(dbPromise);

	cities.drop()
		.then(() => cities.init())
		.then(() => mocks.cities.map((item) => cities.create(item)))
		.then((response) => Promise.all(response))
		.catch((error) => {
			console.log('DEBUG:mocks.js():13 =>');
			console.error(error);
		});

	return cities;
};

const persons = () => {
	const dbPromise = require('./init')('./dbs/persons.sqlite');

	const persons = require('./persons.persons')(dbPromise);
	const phones = require('./persons.phones')(dbPromise);

	persons.drop()
		.then(() => persons.init())
		.then(() => phones.drop())
		.then(() => phones.init())
		.then(() => mocks.persons.map(
			(item) => {
				Promise.all([
					persons.create(item),
					item.phones.map((phone) => {
						phones.create({owner_id: item.id, value: phone})
					})
				])
			})
		)
		.then((response) => Promise.all(response))
		.catch((error) => {
			console.log('DEBUG:mocks.js():27 =>');
			console.error(error);
		});

	relations(dbPromise);

	return persons;
};

function relations() {
	const dbPromise = require('./init')('./dbs/persons.sqlite');

	const relations = require('./persons.relations')(dbPromise);

	relations.drop()
		.then(() => relations.init())
		.then(() => mocks.relations.map((item) => relations.create(item.id_one, item.id_two)))
		.then((response) => Promise.all(response))
		.catch((error) => {
			console.log('DEBUG:mocks.js():43 =>');
			console.error(error);
		});


	return relations;
}

const pets = () => {
	const dbPromise = require('./init')('./dbs/pets.sqlite');

	const pets = {
		Bird: require('./pets.birds')(dbPromise),
		Dog: require('./pets.dogs')(dbPromise),
		Dragon: require('./pets.dragons')(dbPromise),
		Fish: require('./pets.fishes')(dbPromise),
	};

	const ownership = require('./pets.ownership')(dbPromise);

	Promise.resolve()
		.then(() => Object.values(pets)
			.map((item) =>
				item.drop()
					.then(() => item.init())
			))
		.then((response) => Promise.all(response))
		.then(() => ownership.drop().then((response) => ownership.init()))
		.then(() => {
			return mocks.pets
				.map((item) => {
					return pets[item.__typename].create(item)
						.then((response) => ownership.create({id: response.stmt.lastID, owner_id: item.owner_id, __typename: item.__typename}))
				})
		})
		.then((response) => Promise.all(response))
		.catch(console.error);

	return pets;
};

const ownership = () => {
	const dbPromise = require('./init')('./dbs/pets.sqlite');
	const ownership = require('./pets.ownership')(dbPromise);
	return ownership;
};

const phones = () => {
	const dbPromise = require('./init')('./dbs/persons.sqlite');
	const phones = require('./persons.phones')(dbPromise);
	return phones;
};

module.exports = {
	cities: cities(),
	persons: persons(),
	relations: relations(),
	phones: phones(),
	pets: pets(),
	ownership: ownership(),
};
