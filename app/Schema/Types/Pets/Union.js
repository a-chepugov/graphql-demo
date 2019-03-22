const {
	GraphQLUnionType,
} = require('graphql');

module.exports.default = new GraphQLUnionType({
	name: 'PetUnion',
	fields: () => ({
		id: {type: new GraphQLNonNull(GraphQLID)},
		name: {type: GraphQLString},
		owner: {
			type: require('../Person').default,
			resolve(parent, args, context, info) {
				return context.models.persons.get(parent.owner_id);
			}
		},
	}),
	types: [
		require('./Bird').default,
		require('./Dog').default,
		require('./Dragon').default,
		require('./Fish').default,
	],
	resolveType: (parent) => {
		return switchTypeIdToName(parent.__typename);
	}
});

function switchTypeIdToName(type) {
	switch (type) {
		case 1:
			return require('./Bird').default;
		case 2:
			return require('./Dog').default;
		case 3:
			return require('./Dragon').default;
		case 4:
			return require('./Fish').default;
		default:
			throw new Error('Unknown type');
	}
}
