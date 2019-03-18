const {
	GraphQLID,
	GraphQLNonNull
} = require('graphql');

module.exports = {
	type: require('../Types/Person'),
	args: {
		id: {type: GraphQLNonNull(GraphQLID)},
		date: {type: require('../Types/ISODate')}
	},
	resolve(parent, args, context, info) {
		return context.dbs.persons.then((db) =>
			db.get('SELECT * FROM persons WHERE id = ?', args.id))
	}
};
