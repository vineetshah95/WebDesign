'use strict';

const userService = require('./../services/userService');
const jobService = require('./../services/jobService');

/*
    Create Student job tracking functionality
*/
exports.dashboard = (request, response) => {
  const userId = request.user.id;
  // an example using an object instead of an array
  async.parallel({
    applicationGraph: function(callback) {
      const applicationData = jobService.applicationData(userId);
      const applicationResult = (applicationResult1)=>{
        callback(null, applicationResult1)
      }
      applicationData
        .then(applicationResult)
        .catch(renderErrorResponse(response));
    },
    userDetails: function(callback){

      const promise = userService.get(userId);
      promise
        .then(
          function (result) {
            if (result == null) {
              callback(null)
            } else {
              let path = 'http://localhost:3000' + result.profileImage;

              result.profileImage = path;
              callback(null, result)
            }
          })
        .catch(renderErrorResponse(response));
    },
    inteviewGraph: function(callback) {
      const interviewData = jobService.interviewData(userId);
      const interviewResult = (interviewResult)=>{
        callback(null, interviewResult);
      }
      interviewData
        .then(interviewResult)
        .catch(renderErrorResponse(response));
    },
    dashboardDetails: function (callback) {
      const jobStatusData = jobService.dashboardData(userId);
      const jobDataResult = (jobDataResult)=>{
        callback(null, jobDataResult);
      }
      jobStatusData
        .then(jobDataResult)
        .catch(renderErrorResponse(response));
    }
  }, function(err, results) {
    // results is now equals to: {one: 1, two: 2}
    if(err){
      renderErrorResponse(err);
    }
    else{
      response.status(200);
      response.json({
        message: 'Dashboard data retrieved successfully.',
        data: results
      })
    }
  });


};

/*Get Job List*/
exports.getJobList = (request, response) => {
  const userId = request.user.id;
  const params = {};
  if(userId) {
    params.userId = userId;
  };
  const promise = jobService.jobSearch(params);
  const result = (jobs) => {
    batch(jobs).sequential()
      .each(function(i, item, done) {
        if(typeof (item.jobResume) != 'undefined'){
          item.jobResume = 'http://localhost:3000' + item.jobResume;
        }
        if(typeof (item.jobCoverLetter) != 'undefined'){
          item.jobCoverLetter = 'http://localhost:3000' + item.jobCoverLetter;
        }
        done(item);
      }).end(function(results) {
      response.status(200);
      response.json(jobs);
    });
  };
  promise
    .then(result)
    .catch(renderErrorResponse(response));
};

/*Adds a Job Object*/
exports.createJob = (request, response) => {
  const userId = request.user.id;
  const jobData = Object.assign({userId: userId}, request.body);
  const result = (savedJob) => {
    response.status(201);
    response.json(savedJob);
  };
  const promise = jobService.save(jobData);
  promise
    .then(result)
    .catch(renderErrorResponse(response));
};

exports.getJobItem = (request, response) => {
  const userId = request.user.id;
  const jobId = request.params.id;
  const promise = jobService.get(jobId);
  promise
    .then(
      function(result){
        if(result == null){
          response.status(404);
          response.json({
            message: "ID not found."
          });
        }
        else{
          if(typeof (result.jobResume) != 'undefined'){
            result.jobResume = 'http://localhost:3000' + result.jobResume;
          }
          if(typeof (result.jobCoverLetter) != 'undefined'){
            result.jobCoverLetter = 'http://localhost:3000' + result.jobCoverLetter;
          }
          response.status(200);
          response.json({
            message: "Successfully found the Job item.",
            data: result
          });
        }
      })
    .catch(renderErrorResponse(response));
};

/*Update Job Item*/
exports.updateJob = (request, response) => {
  var storage = multer.diskStorage(
    {
      destination: function(request, file, callback)
      {
        callback(null, './app/public/users/documents')
      },
      filename: function(request, file, callback)
      {
        console.log("FILE",file)
        var extension = file.originalname.split('.');
        console.log(extension[extension.length -1]);
        crypto.pseudoRandomBytes(16, function (err, raw)
          {
            var filePath = randomstring.generate(10) +'.'+extension[extension.length -1];
            //console.log(imagePath)
            callback(null, filePath);
          }
        );
      }
    }
  );
  var upload = multer(
    {
      storage: storage
    }
  ).array('documentImages',2)
  upload(request, response, function(err)
    {
      const uploadType = request.body.uploadType;
      console.log("uploadType=>",request.files);
      const jobId = request.params.id
      const jobData = Object.assign(request.body);
      console.log("jobData=>",jobData);
      jobData.id = jobId;
      jobData.updatedAt = new Date()
      if (request.files != null && typeof(request.files) != 'undefined'){
        if(typeof(uploadType) != ' undefined')
        {
          if(uploadType == 'both'){
            jobData.jobResume = '/users/documents/' + request.files[0].filename;
            jobData.jobCoverLetter = '/users/documents/' + request.files[1].filename;
          }
          else if(uploadType == 'resume'){
            jobData.jobResume = '/users/documents/' + request.files[0].filename;
          }
          else if(uploadType == 'coverletter'){
            jobData.jobCoverLetter = '/users/documents/' + request.files[0].filename;
          }
          delete jobData.uploadType;
        }
      }
      const result = (savedJob) => {
        response.status(201);
        response.json(savedJob);
      };
      const jobSearchResult = (jobSearch) => {
        console.log("jobSearch=>",jobSearch);
        if(jobSearch){
          const promise = jobService.updateData(jobData);
          promise
            .then(result)
            .catch(renderErrorResponse(response));
        }
        else{
          response.status(400);
          response.json({
            message: "Job not found."
          });
        }
      };
      const jobSearch = jobService.get(jobId);
      jobSearch
        .then(jobSearchResult)
        .catch(renderErrorResponse(response));
    }
  );
};

exports.deleteJobItem = (request, response) => {
  const jobId = request.params.id;
  const promise = jobService.deleteData(jobId);
  promise
    .then(
      function(result){
        console.log(result);
        if(result == null){
          response.status(404);
          response.json({
            message: "ID not found."
          });
        }
        else{
          response.status(200);
          response.json({
            message: "Successfully Deleted the item."
          });
        }
      }
    )
    .catch(renderErrorResponse(response));

};

/*Add Job Task*/
exports.addJobTask = (request, response) => {
  const jobId = request.params.id;
  const jobData = Object.assign({jobId: jobId}, request.body);
  const result = (savedJobTask) => {
    response.status(201);
    response.json(savedJobTask);
  };
  const promise = jobService.saveTask(jobData);
  promise
    .then(result)
    .catch(renderErrorResponse(response));

};
/*Get Job Task List */
exports.getJobTaskList = (request, response) => {
  const jobId = request.params.id;
  const promise = jobService.jobTaskSearch(jobId);
  const result = (jobs) => {
    response.status(200);
    response.json(jobs);
  };
  promise
    .then(result)
    .catch(renderErrorResponse(response));
};

/*Update Job Task*/
exports.updateJobTask = (request, response) => {
  const jobTaskId = request.params.id;
  const updatedJobTask = Object.assign({}, request.body);
  let date = new Date();
  // updates the date as the user updates an item
  updatedJobTask.updatedAt = date;
  updatedJobTask.id = jobTaskId;
  const promise = jobService.updateJobTask(updatedJobTask);
  promise
    .then(
      function(result){
        if(result == null){
          response.status(404);
          response.json({
            message: "Task not found."
          });
        }
        else{
          response.status(200);
          response.json({
            message: "Successfully updated the Task.",
            data: result
          });
        }
      })
    .catch(renderErrorResponse(response));
};

/*Delete a Job Task*/
exports.deleteJobTask = (request, response) =>{
  const taskId = request.params.id;
  const promise = jobService.deleteJobTask(taskId);
  promise
    .then(
      function(result){;
        if(result == null){
          response.status(404);
          response.json({
            message: "Task not found."
          });
        }
        else{
          response.status(200);
          response.json({
            message: "Successfully Deleted the Job Task."
          });
        }
      }
    )
    .catch(renderErrorResponse(response));
}

/*Add Job notes*/
exports.addJobNotes = (request, response) => {
  const jobData = Object.assign({}, request.body);
  const result = (savedJobNote) => {
    response.status(201);
    response.json(savedJobNote);
  };
  const promise = jobService.saveNote(jobData);
  promise
    .then(result)
    .catch(renderErrorResponse(response));

};
/*Get Job Task List */
exports.getJobNotesList = (request, response) => {
  const jobId = request.params.id;
  console.log("JobId: ",jobId);
  const promise = jobService.jobNoteSearch(jobId);
  const result = (jobs) => {
    response.status(200);
    response.json(jobs);
  };
  promise
    .then(result)
    .catch(renderErrorResponse(response));
};

/*Update Job Task*/
exports.updateJobNote = (request, response) => {
  const jobNoteId = request.params.id;
  const updatedJobNote = Object.assign({}, request.body);
  let date = new Date();
  // updates the date as the user updates an item
  updatedJobNote.updatedAt = date;
  updatedJobNote.id = jobNoteId;
  const promise = jobService.updateJobNote(updatedJobNote);
  promise
    .then(
      function(result){
        if(result == null){
          response.status(404);
          response.json({
            message: "Note not found."
          });
        }
        else{
          response.status(200);
          response.json({
            message: "Successfully updated the Note.",
            data: result
          });
        }
      })
    .catch(renderErrorResponse(response));
};

/*Delete a particular note*/
exports.deleteJobNote = (request, response) =>{
  const taskId = request.params.id;
  const promise = jobService.deleteJobNote(taskId);
  promise
    .then(
      function(result){;
        if(result == null){
          response.status(404);
          response.json({
            message: "Note not found."
          });
        }
        else{
          response.status(200);
          response.json({
            message: "Successfully Deleted the Job Note."
          });
        }
      }
    )
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
