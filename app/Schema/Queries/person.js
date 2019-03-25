const {
	GraphQLID,
	GraphQLNonNull
} = require('graphql');

module.exports = {
	type: require('../Types/Person').default,
	args: {
		id: {type: new GraphQLNonNull(GraphQLID)},
		date: {type: require('../Types/ISODate').default}
	},
	resolve(parent, args, context, info) {
		return context.managers.persons.get(args.id);
	}
};
