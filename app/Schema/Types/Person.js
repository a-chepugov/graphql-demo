const {
	GraphQLID,
	GraphQLObjectType,
	GraphQLFloat,
	GraphQLList,
	GraphQLNonNull,
	GraphQLString,
} = require('graphql');

const Person = new GraphQLObjectType({
	name: 'Person',
	fields: () => ({
		id: {type: new GraphQLNonNull(GraphQLID)},
		name: {type: GraphQLString},
		birthdate: {type: GraphQLFloat, deprecationReason: 'Пример пометки поля устаревшим'},
		birthdateISO: {type: require('./ISODate'),
			resolve(parent, args, context, info) {
			return parent.birthdate;
			}
		},
		phone: {type: GraphQLString},
		text: {type: GraphQLString},
		friends: {
			type: GraphQLList(Person),
			resolve(parent, args, context, info) {
				return context.dbs.persons
					.then((db) => db.all('SELECT id_two as id FROM relations WHERE id_one = ?', parent.id))
					.then((response) => response.map(({id}) => id))
					.then((ids) =>
						Promise.all(
							ids.map((id) =>
								context.dbs.persons.then((db) =>
									db.get('SELECT * FROM persons WHERE id = ?', id))))
					)
			}
		},
		city: {
			type: require('./City'),
			resolve(parent, args, context, info) {
				return context.dbs.cities.then((db) => db.get('SELECT * FROM cities WHERE id = ?', parent.city_id))
			}
		}
	})
});

module.exports = Person;


// context.dbs.persons.then((db) => db.all(`SELECT * FROM persons WHERE id in (${ids.join(',')})`))
