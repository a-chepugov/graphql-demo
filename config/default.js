const packageJson = require('../package.json');

module.exports = {
  name: packageJson.name,
  version: packageJson.version,
  port: process.env.NODE_PORT || 3000,
};
