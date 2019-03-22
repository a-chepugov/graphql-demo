const {
	GraphQLID,
	GraphQLNonNull
} = require('graphql');

module.exports = {
	type: require('../Types/Person').default,
	args: {
		id: {type: GraphQLNonNull(GraphQLID)},
		date: {type: require('../Types/ISODate').default}
	},
	resolve(parent, args, context, info) {
		return context.models.persons.get(args.id);
	}
};
