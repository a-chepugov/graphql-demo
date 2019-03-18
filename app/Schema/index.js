const {
	GraphQLObjectType,
	GraphQLSchema
} = require('graphql');

const query = new GraphQLObjectType({
	name: 'Query',
	description: 'Схема',
	fields: () => ({
		echo: require('./Queries/echo'),
		city: require('./Queries/city'),
		person: require('./Queries/person'),
	})
});

const schema = new GraphQLSchema({
	query
});

module.exports = {schema};
