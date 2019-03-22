const {
	GraphQLID,
	GraphQLObjectType,
	GraphQLNonNull,
	GraphQLString,
} = require('graphql');

module.exports.default = new GraphQLObjectType({
	name: 'Bird',
	interfaces: [require('./Interface').default],
	fields: () => ({
		id: {type: new GraphQLNonNull(GraphQLID)},
		name: {type: GraphQLString},
		family: {type: GraphQLString},
		sex: {type: require('../Sex').default},
		owner: {
			type: require('../Person').default,
			resolve(parent, args, context, info) {
				return context.models.persons.get(parent.owner_id);
			}
		},
	}),
	isTypeOf(data) {
		return data.__typename == this.name;
	}
});
