const {
	GraphQLID,
} = require('graphql');

const socket = require('../socket').default;

module.exports.add = {
	type: require('../Types/City').default,
	resolve(source, args, context, info) {
		return source
	},
	subscribe(source, args, context, info) {
		return socket.asyncIterator('CITY_CREATED');
	}
};
