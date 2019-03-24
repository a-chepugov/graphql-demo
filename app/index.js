'use strict';
const config = require('config');
const express = require('express');
const http = require('http');

const graphqlHTTP = require('express-graphql');
const depthLimit = require('graphql-depth-limit');

const app = express();

require('./routes')(app);

// const params = require('./Schema/index0');
const params = require('./Schema/index');

app.use('/', graphqlHTTP({
	schema: params.schema,
	rootValue: params.root,
	graphiql: true,
	context: {managers: require('./sql/mocks')},
	validationRules: [depthLimit(5)]
}));

const port = config.port;
http
	.createServer(app)
	.listen(port, function () {
		console.info(`GraphQL сервер запущен на http://localhost:${port}`);
	});
