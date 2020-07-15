'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
  Mongoose schema for Job Task object.
 */
let JobTaskSchema = new Schema({
        jobId: {
            type: Schema.Types.ObjectId,
            ref: 'job',
            required: "JobId is not provided"
        },
        taskDate: {
            type: Date,
            default: Date.now
        },
        taskDescription: {
            type: String
        },
        isActive: {
            type: Boolean,
            default: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        },
        isDone: {
          type: Boolean,
          default: false
        }
    },
    {
        versionKey: false
    });

// Duplicate the id field as mongoose returns _id field instead of id.
JobTaskSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
JobTaskSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('jobTask', JobTaskSchema);
