/**********************************

***            declaration

**********************************/

        //require modules
var express = require('express');
var mysql = require('mysql');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var exValidator = require('express-validator');
//file upload require



//controller require
var admin = require('./controllers/admin');
var adminHome = require('./controllers/adminHome');
var logout = require('./controllers/logout');

//call 
var app = express();

/**********************************

***            configuration 

**********************************/
app.set('view engine', 'ejs');



/**********************************

***            middleware 

**********************************/

//assets file setting
app.use('/assets',express.static('assets')); 

app.use(expressSession({secret: 'amzad hossain jacky', saveUninitialized: true, resave: false}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(exValidator());

//controller routes use 
app.use('/admin', admin);
app.use('/home', adminHome);
app.use('/logout', logout);



/**********************************

***            routes

**********************************/

//default page / index page open
app.get('/', function(req, res){
    res.render('index');
});

/**********************************

***            server setup

**********************************/
app.listen('3000', function(){
    console.log('server started at 3000!');
});

