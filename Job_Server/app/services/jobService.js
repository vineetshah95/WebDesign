'use strict';
const mongoose = require('mongoose'),
  Job = mongoose.model('job'),
  JobTask = mongoose.model('jobTask'),
  JobNotes = mongoose.model('jobNotes'),
  User = mongoose.model('user');

/**
 * Returns a promise for search results.
 *
 * @param search param.
 */
exports.jobSearch = (params) => {
  const promise = Job.find(params).exec();
  return promise;
};

/*
 * Returns the Job object by id.
 */
exports.get = (jobId) => {
  const promise = Job.findById(jobId).exec();
  return promise;
};


/**
 * Saves the new user object.
 *
 * @param user
 */
exports.save = (params) => {
  const newJob = new Job(params);
  return newJob.save();
};

/*
 * Updates an existing Job Data.
 */
exports.updateData = (updatedJobData) => {
  const promise = Job.findOneAndUpdate({_id: updatedJobData.id}, updatedJobData).exec();
  return promise;
};

/*
 Deletes an existing Job.
 */
exports.deleteData = (jobId) => {
  const promise = Job.findByIdAndRemove(jobId).exec();
  return promise;
};

/**
 * Saves the new user object.
 *
 * @param user
 */
exports.saveTask = (params) => {
  const newJobTask = new JobTask(params);
  return newJobTask.save();
};
/**
 * Returns a promise for search results.
 *
 * @param search param.
 */
exports.jobTaskSearch = (jobId) => {
  const promise = JobTask.find({jobId: jobId}).exec();
  return promise;
};

exports.updateJobTask = (updatedJobTask) => {
  const promise = JobTask.findOneAndUpdate({_id: updatedJobTask.id}, updatedJobTask).exec();
  return promise;
}
/*
 Deletes an existing Job Task.
 */
exports.deleteJobTask = (taskId) => {
  const promise = JobTask.findByIdAndRemove(taskId).exec();
  return promise;
};

exports.saveNote = (params) => {
  const newJobNote = new JobNotes(params);
  return newJobNote.save();
};
/**
 * Returns a promise for search results.
 *
 * @param search param.
 */
exports.jobNoteSearch = (jobId) => {
  const promise = JobNotes.find({jobId: jobId}).exec();
  return promise;
};

exports.updateJobNote = (updatedJobTask) => {
  const promise = JobNotes.findOneAndUpdate({_id: updatedJobTask.id}, updatedJobTask).exec();
  return promise;
}
/*
 Deletes an existing Job Task.
 */
exports.deleteJobNote = (taskId) => {
  const promise = JobNotes.findByIdAndRemove(taskId).exec();
  return promise;
};

/*Student Dashboard*/
exports.applicationData = (userId) => {
  const promise = Job.aggregate(
    [
      {
        $match: {
          userId: mongoose.Types.ObjectId(userId)
        }
      },
      {
        $project :
          {
            month : {$month : "$createdAt"},
            year : {$year : "$createdAt"},
            'jobStatus':1
          }
      },
      {
        $group :
          {
            _id : {month : "$month" ,year : "$year" },
            total : {$sum : 1}
          }
      }
    ]
  )
  return promise;
}

exports.interviewData = (userId) =>{
  const promise = Job.aggregate(
    [
      {
        $match: {
          userId: mongoose.Types.ObjectId(userId)
        }
      },
      {
        $project :
          {
            month : {$month : "$interviewDate1"},
            year : {$year : "$interviewDate1"},
            'jobStatus':1
          }
      },
      {
        $group :
          {
            _id : {month : "$month" ,year : "$year" },
            total : {$sum : 1}
          }
      }
    ]
  )
  return promise;
};

exports.dashboardData = (userId) => {
  const promise = Job.aggregate(
    [
      {
        $match: {
          userId: mongoose.Types.ObjectId(userId)
        }
      },
      {
        $group: {
          _id: {
            jobStatus: '$jobStatus'
          },
          count: {
            $sum: 1
          }
        }
      }
    ]
  )
  return promise;
}





