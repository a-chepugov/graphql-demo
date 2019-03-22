const {
	GraphQLEnumType
} = require('graphql');

module.exports.default = new GraphQLEnumType({
	name: 'Sex',
	description: 'Пол',
	values: {female: {value: 0}, male: {value: 1}}
});
