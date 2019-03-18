'use strict';

const {GraphQLString} = require('graphql');

module.exports = {
	type: GraphQLString,
	description: 'Тестовая echo функция (возвращает то, что ей было отправлено)',
	args: {message: {type: GraphQLString}},
	resolve: (source, {message = ' '}) => `И тебе ${message}, добрый человек!`
};
