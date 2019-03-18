const {
	GraphQLID,
	GraphQLNonNull
} = require('graphql');

module.exports = {
	type: require('../Types/City'),
	args: {
		id: {type: GraphQLNonNull(GraphQLID)}
	},
	resolve(parent, args, context, info) {
		return context.dbs.cities.then((db) =>
			db.get('SELECT * FROM cities WHERE id = ?', args.id))
	}
};
