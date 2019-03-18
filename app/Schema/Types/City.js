const {
	GraphQLID,
	GraphQLObjectType,
	GraphQLNonNull,
	GraphQLList,
	GraphQLInt,
	GraphQLString
} = require('graphql');

module.exports = new GraphQLObjectType({
	name: 'City',
	fields: () => ({
		id: {type: new GraphQLNonNull(GraphQLID)},
		name: {type: GraphQLString},
		code: {type: GraphQLString},
		residents: {
			args: {
				limit: {type: GraphQLInt, defaultValue: 5}
			},
			type: GraphQLList(require('./Person')),
			resolve(parent, args, context, info) {
				return context.dbs.persons
					.then((db) => db.all('SELECT * FROM persons WHERE city_id = ? LIMIT ?', parent.id, args.limit));
			}
		},
	})
});
