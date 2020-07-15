'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
  Mongoose schema for Job Task object.
 */
let JobNotesSchema = new Schema({
        jobId: {
            type: Schema.Types.ObjectId,
            ref: 'job',
            required: "JobId is not provided"
        },
        noteDate: {
            type: Date,
            default: Date.now
        },
        noteDescription: {
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
        }
    },
    {
        versionKey: false
    });

// Duplicate the id field as mongoose returns _id field instead of id.
JobNotesSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
JobNotesSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('jobNotes', JobNotesSchema);
