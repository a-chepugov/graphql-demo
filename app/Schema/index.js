const {
	GraphQLObjectType,
	GraphQLSchema,
} = require('graphql');

const query = new GraphQLObjectType({
	name: 'Query',
	fields: () => ({
		echo: require('./Queries/echo'),
		city: require('./Queries/city'),
		person: require('./Queries/person'),
	})
});




const mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: () => ({
		addCity: require('./Mutations/city').add,
	})
});

const schema = new GraphQLSchema({
	types: [
		require('./Types/Pets/Bird').default,
		require('./Types/Pets/Dog').default,
		require('./Types/Pets/Dragon').default,
		require('./Types/Pets/Fish').default,
	],
	query,
	mutation
});

module.exports = {schema};
