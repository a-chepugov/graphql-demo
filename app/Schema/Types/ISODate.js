const {
	GraphQLScalarType,
	Kind
} = require('graphql');

module.exports.default = new GraphQLScalarType({
	name: 'ISODate',
	serialize(value) {
		return new Date(value);
	},
	parseLiteral(ast) {
		switch (ast.kind) {
			case Kind.STRING: {
				return new Date(ast.value);
			}
			case Kind.INT: {
				return new Date(Number(ast.value));
			}
			default:
				return null;
		}
	},
	parseValue(value) {
		return new Date(Number(value));
	},
});
