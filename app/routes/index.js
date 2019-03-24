module.exports = (app, managers) => {
	require('./static')(app, require('config').static);
	require('./static')(app, 'bower_components');


	app
		.get('/persons/:id', (request, response) =>
			managers.persons.get(request.params.id)
				.then((payload) => response.json(payload))
				.catch((error) => response.status(500))
				.then(() => response.end())
		)

		.get('/persons/:id/friends', (request, response) =>
			managers.relations.get(request.params.id)
				.then((payload) => response.json(payload))
				.catch((error) => response.status(500))
				.then(() => response.end())
		)

		.get('/persons/:id/phones', (request, response) =>
			managers.phones.getByOwnerId(request.params.id)
				.then((payload) => response.json(payload))
				.catch((error) => response.status(500))
				.then(() => response.end())
		)

		.get('/persons/:id/pets', (request, response) =>
			managers.ownership.get(request.params.id)
				.then((payload) => response.json(payload))
				.catch((error) => response.status(500))
				.then(() => response.end())
		)

		.get('/pets/:type/:id', (request, response) => {
			try {
				return managers.pets[request.params.type].get(request.params.id)
					.then((payload) => response.json(payload))
					.catch((error) => response.status(500))
					.then(() => response.end())
			} catch (error) {
				response.status(500).end()
			}
		})

		.get('/cities/:id', (request, response) =>
			managers.cities.get(request.params.id)
				.then((payload) => response.json(payload))
				.catch((error) => response.status(500))
				.then(() => response.end())
		)

		.get('/cities/:id/residents', (request, response) =>
			managers.persons.getInCity(request.params.id)
				.then((payload) => response.json(payload))
				.catch((error) => response.status(500))
				.then(() => response.end())
		);


	return app;
};
