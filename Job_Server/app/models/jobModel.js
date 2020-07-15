'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
  Mongoose schema for Job object.
 */
let JobSchema = new Schema({
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: "UserId is not provided."
        },
        companyName: {
            type: String,
            required: "Company Name not provided."
        },
        jobTitle: {
            type: String,
            required: "Job title not provided."
        },
        jobDescription: {
            type: String
        },
        jobStatus: {
            type: String,
            enum: ['wishlist', 'applied', 'interview', 'offered', 'rejected'],
            default: 'wishlist'
        },
        interviewDate1: {
            type: Date
        },
        interviewDate2: {
            type: Date
        },
        appliedDate: {
            type: Date
        },
        offerDate: {
            type: Date
        },
        jobResume: {
            type: String
        },
        jobCoverLetter: {
            type: String
        },
        salary: {
            type: Number
        },
        location: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        versionKey: false
    });

// Duplicate the id field as mongoose returns _id field instead of id.
JobSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
JobSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('job', JobSchema);
