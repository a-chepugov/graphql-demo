const {
	GraphQLID,
} = require('graphql');

const socket = require('../socket').default;

module.exports.add = {
	type: require('../Types/City').default,
	subscribe(source, args, context, info) {
		return socket.asyncIterator('CITY_CREATED');
	}
};
