'use strict';

const userController = require('./../controllers/userController');
const studentController = require('./../controllers/studentController');

module.exports = (app, passport) => {

  app.route('/trackers/login')
    .post(passport.authenticate('local-login'),
      function(request, response) {
        if(request.user == null || typeof(request.user) == undefined) {
          response.redirect('/trackers/login/failure')
        }
        else{
          if (request.user.userType == 'student') {
            response.redirect('/trackers/student')
          }
          else if (request.user.userType == 'advisor') {
            response.redirect('/trackers/advisor')
          }
          else{
            response.redirect('/trackers/login/failure')
          }
        }
      }
    );

  app.route('/trackers/login/failure')
    .get(userController.failure);

  app.route('/trackers/logout')
    .get(isLoggedIn, userController.logout);

  app.route('/trackers/user')
    .post(userController.createUser)
    .get(isLoggedIn, userController.getUserProfile)
   .put(isLoggedIn, userController.updateUserProfile)
    .delete(isLoggedIn, userController.deleteUserProfile);

    app.route('/trackers/user1')
    .post(isLoggedIn, userController.updateUserProfile)

  app.route('/trackers/password/reset')
    .post(isLoggedIn, userController.resetPassword)

  app.route('/trackers/user/advisor/list')
    .get(userController.getAdvisorList);

  app.route('/trackers/user/forgetpassword')
    .post(userController.forgetPassword)
    .put(userController.verifyPassword);

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
