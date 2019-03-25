'use strict';
const config = require('config');
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

// const graphqlHTTP = require('express-graphql');
const {graphqlExpress, graphiqlExpress} = require('graphql-server-express');
const {SubscriptionServer} = require('subscriptions-transport-ws');
const {subscribe, execute} = require('graphql');

const depthLimit = require('graphql-depth-limit');

const port = config.port;

const managers = require('./sql/mocks');

const app = express();
app.use(bodyParser.json());

require('./routes')(app, managers);

// const params = require('./Schema/index0');
const params = require('./Schema/index');

// app.use('/graphql', graphqlHTTP({
// 	schema: params.schema,
// 	rootValue: params.rootValue,
// 	graphiql: true,
// 	context: {managers},
// 	validationRules: [depthLimit(5)]
// }));

app.use('/graphql', graphqlExpress({
	schema: params.schema,
	rootValue: params.rootValue,
	context: {managers},
	validationRules: [depthLimit(5)]
}));

app.use('/graphiql', graphiqlExpress({
	endpointURL: '/graphql',
	subscriptionsEndpoint: `ws://localhost:${port}/subscriptions`
}));

const server = http.createServer(app);

server.listen(port, function () {
	new SubscriptionServer({
		schema: params.schema,
		execute,
		subscribe,
		onConnect: () => {}
	}, {
		server,
		path: '/subscriptions'
	});

	console.info(`GraphQL сервер запущен на http://localhost:${port}`);
});
