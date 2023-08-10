var express = require('express');
var app = express();
const passport = require('passport');
var bodyParser = require('body-parser');

var mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost/my_school');

app.set('views', 'index');
app.use(bodyParser.json()); 

app.use(bodyParser.urlencoded({ extended: true })); 

app.use(express.static('public'));

var usermodel = require("./schema/userschema");


require('./auth/auth')
var st = require('./routes/students');
var stsb = require('./routes/stdsub');
var sb = require('./routes/subjects');

var st = require('./routes/students');
var stsb = require('./routes/stdsub');
var sb = require('./routes/subjects');
const routes = require('./routes/user'); 
var exam =require('./routes/exam');
var mark =require('./routes/marks');


app.use('/student',st);
app.use('/ss',stsb);
app.use('/subject',sb);
app.use('/', routes);
app.use('/exam',exam)
app.use('/mark',mark);

// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use('/user', passport.authenticate('jwt', { session: false }), routes);

// Handle errors.
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error: err });
});
 

app.listen(5000);