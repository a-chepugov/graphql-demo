const {
	buildSchema
} = require('graphql');

var schema = buildSchema(`
type Query {
	message: String,
	city(id: ID): City
	person(id: ID): Person
},
type Person {
	id: ID,
	name: String,
	phone: String,
	birthdate: Float
}
type City {
	id: ID,
	name: String,
	code: String
	residents: [Person]
}
`);

const root = {
	message: () => 'Hello World!',
	city(args, context) {
		return context.models.cities.get(args.id);
	},
	person(args, context) {
		return context.models.persons.get(args.id);
	}
};

module.exports = {schema, root};
