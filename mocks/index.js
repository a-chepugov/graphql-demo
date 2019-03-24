let persons = require('./persons');
let cities = require('./cities');
let pets = require('./pets');

const personsList = Array.from(new Array(100)).map((item, index, array) => {
	const person = persons.create(index);
	const city = cities.getOne();

	const phones = Array.from(new Array(Math.ceil(Math.random() * 3)), () => {
		const number = (Array.from(new Array(12), () => Math.floor(Math.random() * 10))).join('');
		return city.code.padEnd(13, number);
	});

	return Object.assign({cityId: city.id, phones}, person);
});

const petsList = personsList.reduce((a, item) => {
	const petsList = Array.from(new Array(Math.ceil(Math.random() * 3)), () => Object.assign({owner_id: item.id}, pets.create()));
	return a.concat(petsList);
}, []);

const randomOne = require('./_randomOne');

const relationsList = personsList.reduce((a, item, index, array) => {
	let ids = Array
		.from(new Array(Math.ceil(Math.random() * 3)), () => randomOne(personsList))
		.map(({id}) => id)
		.filter((id) => item.id !== id);

	ids = Array.from(new Set(ids));

	return a.concat(ids.map((id) => ({id_one: item.id, id_two: id})));
}, []);

module.exports = {
	persons: personsList,
	relations: relationsList,
	pets: petsList,
	cities: cities
};
