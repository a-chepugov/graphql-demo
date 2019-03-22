const cities = [
	{name: 'Canberra', code: '+612'},
	{name: 'Kiev', code: '+38044'},
	{name: 'London', code: '+4420'},
	{name: 'Madrid', code: '+34'},
	{name: 'Moscow', code: '+7495'},
	{name: 'USA', code: '+1202'}
].map((item, index) => {
	item.id = index + 1;
	return item
});

module.exports = cities;

const randomOne = require('./_randomOne');

module.exports.getOne = () => randomOne(cities);
