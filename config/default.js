const packageJson = require('../package.json');

module.exports = {
  name: packageJson.name,
  version: packageJson.version,
	host: process.env.HOST || '127.0.0.1',
  port: process.env.NODE_PORT || 3000,
	static: './static',
};
