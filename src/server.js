var express = require('express');
var path = require('path');
var morgan = require('morgan'); // logger
var bodyParser = require('body-parser');
var api = require('../backend/api');
var Cookies = require( "cookies" );
var session = require('express-session');

var multer = require('multer');

var app = express();

app.set('port', (process.env.APP_PORT || 3000));

app.use('/', express.static(__dirname + '/../../dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (process.env.APP_ENV !== 'production') {
  app.use(morgan('dev'));
}

// cookies
app.use(Cookies.express());
app.use(session({
  secret: 'Notia.$23$.White',
  resave: false,
  saveUninitialized: true
}));

app.use('/', express.static(__dirname + '../dist'));
app.use('/assets', express.static(path.join(__dirname, '../dist/assets'), {maxAge: 30}));
app.use(express.static(path.join(__dirname, '../dist'), {index: false}));

// cache
app.use(function (req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next()
});

// Route
var appFile = function(req, res) {
  res.sendFile(path.join(__dirname, './../dist/index.html'));
};
app.get('/api/test', api.test);

app.get('*', appFile);

app.listen(app.get('port'), function() {
  console.log('Angular 2 Full Stack listening on port '+app.get('port'));
});

module.exports = app;
