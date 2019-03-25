const {
	GraphQLObjectType,
} = require('graphql');

module.exports.default = new GraphQLObjectType({
	name: 'Subscription',
	fields: {
		addCity: require('./city').add,
		getMessage: require('./message').get,
	}
});
