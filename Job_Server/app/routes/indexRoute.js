'use strict';

const userRoute = require('./../routes/userRoute');
const studentRoute = require('./../routes/studentRoute');
const advisorRoute = require('./../routes/advisorRoute');

module.exports = (app, passport) => {
    userRoute(app, passport);
    studentRoute(app, passport);
    advisorRoute(app, passport);
};
