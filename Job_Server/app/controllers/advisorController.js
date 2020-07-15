'use strict';

const userService = require('./../services/userService');
const jobService = require('./../services/jobService');

/*
    Create Advisor job tracking functionality
*/

exports.dashboard = (request, response) => {
  console.log(typeof (request.user.id))
  const userId = request.user.id;
  const params = {};

  if(userId) {
    params.advisorId = userId;
  };
  const promise = userService.getUserIdList(params);

  const result = (students) => {
    const studentList = [];
    batch(students).sequential()
      .each(function (i, item,callback) {
          studentList.push(mongoose.Types.ObjectId(item));
        //console.log(typeof (studentList[0]));
        callback(null);
      }).end(function(results) {
          const dashboardResult = (results)=>{
            response.status(200);
            response.json({
              message: 'Advisor Dashboard data retrieved successfully.',
              data: results
            })
          }
          const getDashboardData = userService.advisorDashboard(studentList);
          getDashboardData
            .then(dashboardResult)
            .catch(renderErrorResponse(response))
        });
      }
  promise
    .then(result)
    .catch(renderErrorResponse(response));
};

exports.getStudentList = (request, response) => {
  const userId = request.user.id;
  const params = {};
  if(userId) {
    params.advisorId = userId;
  };
  const promise = userService.userList(params);
  const result = (students) => {
    var finalArray = [];
    batch(students).sequential()
      .each(function (i, student, callback) {
        student.profileImage = 'http://localhost:3000' + student.profileImage;
        const studentResult = (studentResultInfo)=>{
          var temp = {};
          temp.studentJobData = studentResultInfo;
          temp.studentInfo = student;
          finalArray.push(temp);
          callback(student);
        }
        const studentJobData = userService.studentJobInfo(student.id);
        studentJobData
          .then(studentResult)
          .catch(renderErrorResponse(response));
      }).end(function (studentResult) {
      response.status(200);
      response.json(finalArray);
    })
    // batch(students).parallel()
    //   .each(function(i, item, done) {
    //
    //    const studentResult = (studentResultInfo)=>{
    //       students[i]['studentResultInfo']=studentResultInfo
    //       done(item);
    //     }
    //     const studentJobData = userService.studentJobInfo(item.id);
    //     studentJobData
    //       .then(studentResult)
    //       .catch(renderErrorResponse(response));
    //
    //   }).end(function(results) {
    //   response.status(200);
    //   response.json(students);
    // });
  };
  promise
    .then(result)
    .catch(renderErrorResponse(response));
}


/*
 Throws error if error object is present.
 */
let renderErrorResponse = (response) => {
  const errorCallback = (error) => {
    console.log(error);
    if (error) {
      response.status(500);
      response.json({
        message: error.message
      });
    }
  };
  return errorCallback;
};
