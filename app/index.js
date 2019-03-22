'use strict';
const http = require('http');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const config = require('config');
const depthLimit = require('graphql-depth-limit');

const models = require('./sql/mocks');

// const params = require('./Schema/index0');
const params = require('./Schema/index');

const app = express();

app.use('/', graphqlHTTP({
	schema: params.schema,
	rootValue: params.root,
	graphiql: true,
	context: {models},
	validationRules: [depthLimit(5)]
}));

const port = config.port;
const server = http.createServer(app);

server.listen(port, function () {
	console.info(`GraphQL сервер запущен на http://localhost:${port}`);
});
