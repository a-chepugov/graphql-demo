const {
	GraphQLID,
	GraphQLNonNull
} = require('graphql');

module.exports = {
	type: require('../Types/City').default,
	args: {
		id: {type: new GraphQLNonNull(GraphQLID)}
	},
	resolve(parent, args, context, info) {
		return context.managers.cities.get(args.id)
	}
};
