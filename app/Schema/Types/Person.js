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
		sex: {type: require('./Sex').default},
		birthdate: {type: GraphQLFloat, deprecationReason: 'Пример пометки поля устаревшим'},
		birthdateISO: {
			type: require('./ISODate').default,
			resolve(parent, args, context, info) {
				return parent.birthdate;
			}
		},
		phone: {type: GraphQLString},
		text: {type: GraphQLString},
		friends: {
			type: new GraphQLList(Person),
			resolve(parent, args, context, info) {
				return context.managers.relations.get(parent.id)
					.then((ids) => ids.map((id) => context.managers.persons.get(id)))
					.then((response) => Promise.all(response))
				// .then((ids) => context.managers.persons.getMany(ids))
			}
		},
		city: {
			type: require('./City').default,
			resolve(parent, args, context, info) {
				return context.managers.cities.get(parent.city_id);
			}
		},
		pets: {
			// type: new GraphQLList(require('./Pets/Union').default),
			type: new GraphQLList(require('./Pets/Interface').default),
			resolve(parent, args, context, info) {
				return context.managers.ownership.get(parent.id)
					.then((response) =>
						response.map((item) => {
							console.log('DEBUG:Person.js():47 =>', item);

							return context.managers.pets[item.__typename].get(item.id)
								.then((response) => Object.assign(response, item))}
						)
					)
			},
		}
	})
});

module.exports.default = Person;
