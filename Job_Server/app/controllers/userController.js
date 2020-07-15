'use strict';

const userService = require('./../services/userService');
const jobService = require('./../services/jobService');
const mailConfig = require('./../config/mail');
/*
 Creates a new todo item and sets the response.
 */

exports.createUser = (request, response) => {
    var storage = multer.diskStorage(
      {
        destination: function(request, file, callback)
        {
          callback(null, './app/public/users/images')
        },
        filename: function(request, file, callback)
        {
          crypto.pseudoRandomBytes(16, function (err, raw)
            {
              var imagePath = randomstring.generate(10) +'.png';
              //console.log(imagePath)
              callback(null, imagePath);
            }
          );
        }
      }
    );
    var upload = multer(
      {
        storage: storage
      }
    ).single('profileImage')
    upload(request, response, function(err)
      {
        const user = Object.assign({}, request.body);
        const query = {emailId: request.body.emailId};
        const saltRounds = 10;
        bcrypt.hash(request.body.password, saltRounds, function (err, hash) {
          user.password = hash;
          var imagePath = '/users/images/' + request.file.filename;
          user.profileImage = imagePath
          const result = (savedUser) => {
            response.status(201);
            response.json(savedUser);
          };
          const userSearchResult = (userSearch) => {
            if(userSearch){
              response.status(409);
              response.json({
                message: "emailId already exists"
              });
            }
            else{
              const promise = userService.save(user);
              promise
                .then(result)
                .catch(renderErrorResponse(response));
            }
          };
          const searchUser = userService.userSearch(query);
          searchUser
            .then(userSearchResult)
            .catch(renderErrorResponse(response));
        });
      }
    );
};

/*User log out*/
exports.logout = (request, response) => {
    request.logout();
    response.statusCode = 200;
    response.json(
      {
          message: 'User logged out successfully.'
      }
    );
};

/*Login failure*/
exports.failure = (request, response) => {
    response.status(401);
    response.json(
      {
          message: 'Email-id or password is incorrect.'
      }
    );
};



/*Get User Profile*/
exports.getUserProfile = (request, response) => {
  const userId = request.user.id;
    const promise = userService.userSearch({_id: userId});
    promise
      .then(
        function (result) {
          if (result == null) {
            response.status(404);
            response.json({
              message: "ID not found."
            });
          } else {
            let path = 'http://localhost:3000' + result.profileImage
            result.profileImage = path;
            // result.dateOfBirth = moment(result.dateOfBirth).format('MM-DD-YYYY');
            response.status(200);
            response.json({
              message: "Successfully found the user profile.",
              data: {
                data: result,
              }
            });
          }
        })
      .catch(renderErrorResponse(response));
};

/*Update User Profile*/
exports.updateUserProfile = (request, response) => {
  var storage = multer.diskStorage(
    {
      destination: function(request, file, callback)
      {
        console.log(file);
        callback(null, './app/public/users/images')
      },
      filename: function(request, file, callback)
      {
        crypto.pseudoRandomBytes(16, function (err, raw)
          {
            var imagePath = randomstring.generate(10) +'.png';
            //console.log(imagePath)
            callback(null, imagePath);
          }
        );
      }
    }
  );
  var upload = multer(
    {
      storage: storage
    }
  ).single('profileImage')
  upload(request, response, function(err)
    {
      const user = Object.assign({}, request.body);
      console.log('user',request.body)
      const query = {_id: request.user.id};
      user.id = request.user.id;
      if (request.file != null && typeof(request.file) != 'undefined'){
        console.log('request',request.file)
        var imagePath = '/users/images/' + request.file.filename;
        user.profileImage = imagePath
      }
      const result = (savedUser) => {
        response.status(201);
        response.json(savedUser);
      };
      const userSearchResult = (userSearch) => {
        if(userSearch){
          console.log(userSearch)
          userSearch.updatedAt = new Date();
          const promise = userService.updateData(user);
          promise
            .then(result)
            .catch(renderErrorResponse(response));
        }
        else{
          response.status(400);
          response.json({
            message: "User not found."
          });
        }
      };
      const searchUser = userService.userSearch(query);
      searchUser
        .then(userSearchResult)
        .catch(renderErrorResponse(response));
    }
  );
};

/*Delete a User*/
exports.deleteUserProfile = (request, response) =>{
  const userId = request.user.id;
    const query = {_id: userId};

    const userSearchResult = (userSearch) => {
      if(!userSearch){
        response.status(404);
        response.json({
          message: "Not a valid Id"
        });
      }
      else{
        const promise = userService.deleteData(userId);
        promise
          .then(
            function(result){
              console.log(result);
              if(result == null){
                response.status(404);
                response.json({
                  message: "User not found."
                });
              }
              else{
                response.status(200);
                response.json({
                  message: "Successfully Deleted the User Data."
                });
              }
            }
          )
          .catch(renderErrorResponse(response));
      }
    };
    const searchUser = userService.userSearch(query);
    searchUser
      .then(userSearchResult)
      .catch(renderErrorResponse(response));
}

/*Change Password*/
exports.resetPassword = (request, response) => {
  const userId = request.user.id;
  let date = new Date();

  let query = {_id: userId};
  const searchPromise = userService.userSearch(query);
  searchPromise
    .then(
      function (user)
        {
          if (user == null)
          {
            response.status(404);
            response.json({
              message: "ID not found."
            });
          }
          else
            {
              bcrypt.compare(request.body.password, user.password, function(err, result){
                  if(result==true){
                    var date = new Date();
                    const saltRounds = 10;
                    bcrypt.hash(request.body.newPassword, saltRounds, function (err, hash) {
                      if(err)
                      {
                        renderErrorResponse(err);
                      }
                      else{
                        user.password = hash;
                        user.updatedAt = date;
                        user.save()
                        response.status(200);
                        response.json({
                          message: "Password updated."
                        })
                      }
                    })
                  }
                  else{
                    response.status(409);
                    response.json({
                      message: "Password incorrect."
                    });
                  }
              })
            }
          }
          );
}

/* Get Advisor list */
exports.getAdvisorList = (request, response) => {
  let query = {userType: 'advisor'};
  const promise = userService.userList(query);
  promise
    .then(
      function(result){
        if(result.length == 0){
          response.status(404);
          response.json({
            message: "Advisor not found."
          });
        }
        else{
          response.status(200);
          response.json({
            message: "SUCCESS.",
            data: result
          });
        }
      })
    .catch(renderErrorResponse(response));
}

exports.forgetPassword = (request, response) => {
  let forgetCode = randomstring.generate({
    length: 12,
  });
  const user = Object.assign({}, request.body);
  const query = {emailId: request.body.emailId};
  const searchUser = userService.userSearch(query);
  const userSearchResult = (userSearch) => {
    if(!userSearch){
      response.status(404);
      response.json({
        message: "Email id not registered."
      });
    }
    else{
      userSearch.forgetCode = forgetCode;
      userSearch.save();
      mailConfig.forgetMail(userSearch.name, userSearch.emailId, forgetCode);
      response.status(200);
      response.json({
        message: 'Verification code sent to provided emailId.'
      });
    }
  };
  searchUser
    .then(userSearchResult)
    .catch(renderErrorResponse(response));
};

exports.verifyPassword = (request, response) => {
  let query = {emailId: request.body.emailId};
  const searchUser = userService.userSearch(query);
  const userSearchResult = (userSearch) => {
    if(!userSearch){
      response.status(404);
      response.json({
        message: "Email id not registered."
      });
    }
    else if(userSearch.forgetCode != request.body.forgetCode)
    {
      response.status(400);
      response.json({
        message: "Verification failed."
      });
    }
    else if(userSearch.forgetCode == request.body.forgetCode)
    {
      var date = new Date();
      const saltRounds = 10;
      bcrypt.hash(request.body.password, saltRounds, function (err, hash) {
        if(err)
        {
          renderErrorResponse(err);
        }
        else{
          userSearch.password = hash;
          userSearch.updatedAt = date;
          userSearch.forgetCode = null;
          userSearch.save()
          response.status(200);
          response.json({
            message: "Password updated."
          })
        }
      })
    }
  }
  searchUser
    .then(userSearchResult)
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
