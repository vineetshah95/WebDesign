'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
  Mongoose schema for user object.
 */
let UserSchema = new Schema({
        name: {
            type: String,
            required: "Name is not provided"
        },
        age:{
          type: Number
        },
        zipcode: {
          type: String
        },
        aboutMe: {
          type: String
        },
        advisorId: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        phoneNumber: {
            type: String,
            required: "Phone Number is not provided"
        },
        gender:{
            type: String
        },
        emailId: {
            type: String,
            useCreateIndex: true,
            required: "Email Id is not provided"
        },
        address:{
            type: String
        },
        dateOfBirth:{
            type: String,
            required: "Date of Birth not provided"
        },
        password: {
            type: String,
            minlength: 6,
            required: "Password not provided"
        },
        profileImage: {
            type: String,
            required: "Profile image not provided"
        },
        city: {
            type: String,
            required: "City not provided"
        },
        state: {
            type: String,
            required: "State not provided"
        },
        country: {
            type: String,
            required: "Country not provided"
        },
        userType: {
            type: String,
            enum: ['student', 'advisor'],
            required: "UserType not provided"
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
        forgetCode: {
            type: String
        },
        forgetTime: {
            type: Date
        },
        linkedInUrl: {
          type: String
        },
        githubUrl: {
          type: String
        }
    },
    {
        versionKey: false
    });
/*generating a hash*/
UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

/*checking if password is valid*/
UserSchema.methods.validPassword = function(password) {
  if(this.password == password) {
    return true;
  }
  else {

    return false;
  }
};

// Duplicate the id field as mongoose returns _id field instead of id.
UserSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
UserSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('user', UserSchema);
