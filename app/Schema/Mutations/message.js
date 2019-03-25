const {
	GraphQLID,
	GraphQLString,
} = require('graphql');

const socket = require('../socket').default;

module.exports.send = {
	type: GraphQLString,
	args: {message: {type: GraphQLString}},
	resolve(parent, args, context, info) {
		return socket.publish('MESSAGE', args.message);
	}
};
