const {
	buildSchema
} = require('graphql');

var schema = buildSchema(`
type Query {
	message: String,
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
}
`);


const root = {
	message: () => 'Hello World!',
	person(args, {dbs}) {
		return dbs.persons.then((db) =>
			db.get('SELECT * FROM persons WHERE id = ?', args.id))
	}
};

module.exports = {schema, root};
