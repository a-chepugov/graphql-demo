const {
	buildSchema
} = require('graphql');

var schema = buildSchema(`
type Query {
	message: String
	city(id: ID): City
	person(id: ID): Person
},
type Person {
	id: ID
	name: String
	city: [City]
	birthdate: Float
	phones: [String]
	friends: [Person]
	pets: [Pet]
}
type City {
	id: ID
	name: String
	code: String
	residents: [Person]
}
type Pet {
	id: ID
	name: String
}
`);

const rootValue = {
	message: () => 'Hello World!',
	city(args, context) {
		return context.managers.cities.get(args.id);
	},
	person(args, context) {
		return context.managers.persons.get(args.id);
	}
};

module.exports = {schema, rootValue};
