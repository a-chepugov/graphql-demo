const {
	GraphQLString,
	GraphQLObjectType,
} = require('graphql');

const socket = require('../socket').default;

module.exports.get = {
	type: GraphQLString,
	resolve(source, args, context, info) {
		return source
	},
	subscribe: () => {
		return socket.asyncIterator('MESSAGE');
	}
};
