module.exports = (app) => app.use(require('express').static(require('config').static));
