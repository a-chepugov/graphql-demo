let persons = require('./persons');
let cities = require('./cities');

cities = cities.map((item, index) => {
	item.id = index;
	return item
});

const personsShuffled = [];
while (persons.length) {
	const position = Math.floor(Math.random() * persons.length);
	personsShuffled.push((persons.splice(position, 1))[0]);
}

persons = personsShuffled;


const data = persons.map((item, index, array) => {
	const id = index;
	const name = item;
	const friendsCount = Math.ceil(Math.random() * 3);
	let ids = Array.from(new Array(friendsCount), () => {
		const id = Math.floor(Math.random() * array.length);
		return id !== index ? id : undefined;
	}).filter((id) => id !== undefined);

	const relations = Array.from(new Set(ids));

	const birthdate = Math.floor(Math.random() * 946684800000);

	const cityId = Math.floor(Math.random() * cities.length);

	const city = cities[cityId];

	const number = (Array.from(new Array(12), () => Math.floor(Math.random() * 10))).join('');
	const phone = city.code.padEnd(13, number);

	return {
		id, name, relations, birthdate, cityId, phone
	}
});

module.exports = {
	persons: data,
	cities: cities
}
