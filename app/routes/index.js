module.exports = (app) => {
	require('./static')(app);

	app
		.get('/person/:id')

	return app;
};
