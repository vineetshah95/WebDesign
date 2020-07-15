'use strict';

module.exports = (app, passport) => {
    const models = require('./models/indexModel');
    const routes = require('./routes/indexRoute');
    routes(app, passport);
};
