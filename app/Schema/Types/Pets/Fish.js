const {
	GraphQLID,
	GraphQLObjectType,
	GraphQLNonNull,
	GraphQLString,
} = require('graphql');

module.exports.default = new GraphQLObjectType({
	name: 'Fish',
	interfaces: [require('./Interface').default],
	fields: () => ({
		id: {type: new GraphQLNonNull(GraphQLID)},
		name: {type: GraphQLString},
		ecotype: {type: GraphQLString},
		sex: {type: require('../Sex').default},
		owner: {
			type: require('../Person').default,
			resolve(parent, args, context, info) {
				return context.managers.persons.get(parent.owner_id);
			}
		},
	}),
	isTypeOf(data) {
		return data.__typename == this.name;
	}
});
