'use strict';

module.exports.add = {
	type: require('../Types/City').default,
	args: {city: {type: require('../InputTypes/City').default}},
	resolve(parent, args, context, info) {
		return context.managers.cities.create(args.city)
			.then((response) => context.managers.cities.get(response.lastID))
	}
};
