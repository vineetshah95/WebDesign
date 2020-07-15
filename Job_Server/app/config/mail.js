'use strict';
//var image = require('./../public/brand/logo-red.png')
/*--------------------------------------Functions-------------------------*/

module.exports = {
   forgetMail: function(name, emailId, forgetCode)
   {
      //console.log()
  //   var text;
  //   var text1;

     var transporter = nodemailer.createTransport({
       service: 'gmail',
       auth: {
         user: 'jobtrackerz2020@gmail.com',
         pass: 'webproject2020'
       }
     });
     var mailOptions = {
       from: 'jobtrackerz2020@gmail.com',
       to: emailId,
       subject: 'Trackerz.com forgot password',
       attachments: [{
         filename: 'logo-red.png',
         path: './app/public/brand/logo-red.png',
         cid: 'logo'
       }],
       html: "<img src=\"cid:logo\"><h2>Dear "+name+",</h2><p>Please use below verification code to reset your password.<br>Code: <strong>"+forgetCode+"</strong></p><br><br> <p>Happy Searching!</p><p>Trackers.com<br> Customer Support\n" +
         "Need Help? We are always here for you.<br> Email: support@trackerz.com<br>" +
         "Support: +1-808-291-0000</p>"

     };
     transporter.sendMail(mailOptions, function(error, info){
       if (error) {
         console.log(error);
       } else {
         console.log('Email sent: ' + info.response);
       }
     });
   }
};
