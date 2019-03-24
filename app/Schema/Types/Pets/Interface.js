const {
	GraphQLID,
	GraphQLInterfaceType,
	GraphQLNonNull,
	GraphQLString,
} = require('graphql');


module.exports.default = new GraphQLInterfaceType({
	name: 'PetInterface',
	fields: () => ({
		id: {type: new GraphQLNonNull(GraphQLID)},
		name: {type: GraphQLString},
		owner: {
			type: require('../Person').default,
			resolve(parent, args, context, info) {
				return context.managers.persons.get(parent.owner_id);
			}
		},
	}),
	// resolveType: (parent) => {
	// 	return switchTypeIdToType(parent.__typename);
	// }
});

function switchTypeIdToType(typeId) {
	switch (typeId) {
		case 1:
			return require('./Bird').default;
		case 2:
			return require('./Dog').default;
		case 3:
			return require('./Dragon').default;
		case 4:
			return require('./Fish').default;
		default:
			throw new Error('Unknown typeId: ' + typeId);
	}
}

module.exports.switchTypeIdToName = switchTypeIdToType
