const {
	GraphQLID,
	GraphQLObjectType,
	GraphQLNonNull,
	GraphQLList,
	GraphQLInt,
	GraphQLString
} = require('graphql');

module.exports.default = new GraphQLObjectType({
	name: 'City',
	fields: () => ({
		id: {type: new GraphQLNonNull(GraphQLID)},
		name: {type: GraphQLString},
		code: {type: GraphQLString},
		residents: {
			args: {
				limit: {type: GraphQLInt, defaultValue: 5}
			},
			type: new GraphQLList(require('./Person').default),
			resolve(parent, args, context, info) {
				return context.managers.persons.getInCity(parent.id, args.limit);
			}
		},
	})
});
