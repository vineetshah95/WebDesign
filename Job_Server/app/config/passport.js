'use strict';

var LocalStrategy = require('passport-local').Strategy,
    User = require('../models/userModel');

module.exports = function (passport) {

    passport.serializeUser(
        function(user, done)
        {
            done(null, user.id);
        }
    );

  passport.deserializeUser(
    function(id, done)
    {
      User.findById(id)
        .exec(function(err, user)
          {
            done(err, user);
          }
        );
    }
  );

    passport.use(
        'local-login',
        new LocalStrategy(
            {
                usernameField: 'emailId',
                passwordField: 'password',
                passReqToCallback: true
            },
            function(req, emailId, password, done)
            {
                process.nextTick(
                    function()
                    {
                        User.findOne({emailId: emailId})
                            .exec(function(err, user)
                                {
                                  if(err)
                                  {
                                    console.log(err);
                                  }
                                  if (!user)
                                  {
                                    return done(null);
                                  }
                                  bcrypt.compare(password, user.password, function(err, result)
                                    {
                                      if (result == false)
                                      {
                                        return done(null);
                                      }
                                      else{
                                        //console.log('user',user)
                                        return done(null, user);
                                      }
                                    }
                                  )
                                }
                            );
                    }
                );
            }
        )
    );
};
