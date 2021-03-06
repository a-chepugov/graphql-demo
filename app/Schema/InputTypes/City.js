const {
	GraphQLString,
	GraphQLInputObjectType
} = require('graphql');

module.exports.default = new GraphQLInputObjectType({
	name: 'CityInput',
	fields: () => ({
		name: {type: GraphQLString},
		code: {type: GraphQLString}
	})
});
