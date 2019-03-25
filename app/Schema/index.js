const {GraphQLSchema} = require('graphql');

const schema = new GraphQLSchema({
	types: [
		require('./Types/Pets/Bird').default,
		require('./Types/Pets/Dog').default,
		require('./Types/Pets/Dragon').default,
		require('./Types/Pets/Fish').default,
	],
	query: require('./Queries').default,
	mutation: require('./Mutations').default,
	subscription: require('./Subscription').default,
});

module.exports = {schema};
