'use strict';
const mongoose = require('mongoose'),
    Job = mongoose.model('job'),
    User = mongoose.model('user');


exports.userList = (params) => {
  const promise = User.find(params).exec();
  return promise;
}

/**
 * Returns a promise for search results.
 *
 * @param search param.
 */
exports.userSearch = (params) => {
  const promise = User.findOne(params).exec();
  return promise;
};

/*
 * Returns the User object by id.
 */
exports.get = (userId) => {
  const promise = User.findById(userId, {'password': 0}).exec();
  return promise;
};

/**
 * Saves the new user object.
 *
 * @param user
 */
exports.save = (params) => {
  const newUser = new User(params);
  return newUser.save();
};

/*
 * Updates an existing User Data.
 */
exports.updateData = (updatedUserData) => {
  console.log(updatedUserData);
  const promise = User.findOneAndUpdate({_id: updatedUserData.id}, updatedUserData).exec();
  return promise;
};

/*
 Deletes an existing User.
 */
exports.deleteData = (userId) => {
  const promise = User.findByIdAndRemove(userId).exec();
  return promise;
};

exports.getUserIdList = (params) => {
  const promise = User.distinct('_id',params).exec();
  return promise;
}
exports.advisorDashboard = (list) => {
  console.log(list)
  const promise = Job.aggregate
  (
    [
      {
        $match:
          {
            userId:
              {
                $in: list
              }
          }
      },
      {
        $group:
          {
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

exports.studentJobInfo = (userId) => {
  const promise = Job.aggregate
  (
    [
      {
        $match:
          {
            userId: mongoose.Types.ObjectId(userId)
          }
      },
      {
        $group:
          {
            _id: {
              jobStatus: '$jobStatus',
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

