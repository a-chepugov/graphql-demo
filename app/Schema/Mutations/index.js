const {
	GraphQLObjectType,
} = require('graphql');

module.exports.default = new GraphQLObjectType({
	name: 'Mutation',
	fields: () => ({
		addCity: require('./city').add,
		sendMessage: require('./message').send,
	})
});
