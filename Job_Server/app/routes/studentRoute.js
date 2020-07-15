'use strict';

const userController = require('./../controllers/userController');
const studentController = require('./../controllers/studentController');

module.exports = (app, passport) => {
  app.route('/trackers/student')
    .get(studentController.dashboard)

  app.route('/trackers/student/jobs')
    .post(isLoggedIn, studentController.createJob)
    .get(isLoggedIn, studentController.getJobList);

  app.route('/trackers/student/jobs/:id')
    .get(isLoggedIn, studentController.getJobItem)
    .put(isLoggedIn, studentController.updateJob)
    .delete(isLoggedIn, studentController.deleteJobItem);


  app.route('/trackers/student/jobtasks')
    .post(isLoggedIn, studentController.addJobTask)

  app.route('/trackers/student/jobs/:id/jobtasks')
    .get(isLoggedIn, studentController.getJobTaskList);

  app.route('/trackers/student/jobtasks/:id')
    .put(isLoggedIn, studentController.updateJobTask)
    .delete(isLoggedIn, studentController.deleteJobTask);

  app.route('/trackers/student/jobnotes')
    .post(isLoggedIn, studentController.addJobNotes)

  app.route('/trackers/student/jobs/:id/jobnotes')
    .get(isLoggedIn, studentController.getJobNotesList);

  app.route('/trackers/student/jobnotes/:id')
    .put(isLoggedIn, studentController.updateJobNote)
    .delete(isLoggedIn, studentController.deleteJobNote);

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
