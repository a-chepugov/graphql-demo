'use strict';
const http = require('http');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const config = require('config');
const depthLimit = require('graphql-depth-limit');

const dbs = require('./sql/mocks');

const params = require('./Schema/index');
// const params = require('./Schema/index0');

const app = express();

app.use('/', graphqlHTTP({
	schema: params.schema,
	rootValue: params.root,
	graphiql: true,
	context: {dbs},
	validationRules: [depthLimit(5)]
}));

const port = config.port;
const server = http.createServer(app);

server.listen(port, function () {
	console.info(`GraphQL сервер запущен на http://localhost:${port}`);
});
