let express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;
    mongoose = require('mongoose'), //created model loading here
    bodyParser = require('body-parser'),
    async = require('async'),
    batch = require('batchflow'),
    cookieParser = require('cookie-parser'),
    fs = require('fs'),
    moment = require('moment'),
    multer = require('multer'),
    path = require('path'),
    passport = require('passport'),
    session = require('express-session'),
    multipart = require('connect-multiparty');
    randomstring = require('randomstring'),
    bcrypt = require('bcrypt'),
    nodemailer = require('nodemailer'),
    crypto = require('crypto');


const db = mongoose.connection;
// mongoose instance connection url connection
mongoose.connect('mongodb://localhost:27017/jobtracker',
    {useNewUrlParser: true,  useUnifiedTopology: true }
    );
mongoose.Promise = global.Promise;

//Adding body parser for handling request and response objects.
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//Enabling CORS
app.use(function (req, res, next) {
    var allowedOrigins = ['http://localhost:3000', 'http://localhost:4200'];
    var origin = req.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials', true);
    next();
});
/*---------------------------------------Passport session setup--------------------------------*/

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ extended: true, limit: '50mb' }));
app.use(session({ secret: 'soManySecrets', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
//works in update but not in create
//app.use(multipart());
app.use(express.static('./app/public'));
app.use(function (request, response, next) {
    next();
});

/*------------------------ROUTE--------------------*/
var passportConfig = require('./app/config/passport');
passportConfig(passport);

const initApp = require('./app/app');
initApp(app, passport);

app.listen(port);
console.log('Todo RESTful API server started on: ' + port);
