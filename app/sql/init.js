const sqlite = require('sqlite');
module.exports = (file = ':memory:') => sqlite.open(file, {Promise});
