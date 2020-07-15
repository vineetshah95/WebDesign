'use strict';

const userController = require('./../controllers/userController');
const advisorController = require('./../controllers/advisorController');

module.exports = (app, passport) => {
  app.route('/trackers/advisor')
    .get(isLoggedIn, advisorController.dashboard)

  app.route('/trackers/advisor/students')
    .get(isLoggedIn, advisorController.getStudentList);

};

/*route middleware to make sure a user is logged in*/
function isLoggedIn(request, response, next) {

  /*if user is authenticated in the session, carry on*/
  if (request.isAuthenticated())
  {
    return next();
  }
  /*if they aren't redirect them to the home page*/
  response.status(400);
  return response.send(
    {
      status: 'FAILURE',
      message: 'User not logged in'
    }
  );
}
