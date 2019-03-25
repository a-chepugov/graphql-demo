const {
	GraphQLObjectType,
} = require('graphql');

module.exports.default = new GraphQLObjectType({
	name: 'Query',
	fields: () => ({
		echo: require('./echo'),
		city: require('./city'),
		person: require('./person'),
	})
});
