var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var expressLayouts = require('express-ejs-layouts');
const flash = require('express-flash-notification');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const validator = require('express-validator');

const mongoose = require('mongoose');
const mysql = require('./mapp/database/mysql');
const pathConfig = require('./path');

//define path
global.__base = __dirname + '/'
global.__path_app = __base + pathConfig.foler_app + '/'
global.__path_configs = __path_app + pathConfig.folder_configs + '/'
global.__path_helpers = __path_app + pathConfig.folder_helpers + '/'
global.__path_routers = __path_app + pathConfig.folder_routers + '/'
global.__path_schemas = __path_app + pathConfig.folder_schemas + '/'
global.__path_validates = __path_app + pathConfig.folder_validates + '/'
global.__path_views = __path_app + pathConfig.folder_views + '/'

const systemConfig = require(__path_configs + 'system');
const databaseConfig = require(__path_configs + 'database');

var app = express();

app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
app.use(flash(app, {
  localsName: 'flash',
  viewName: __path_views + 'elements/notify',
}))
app.use(validator({
  customValidators: {
    isNotEqual: (value1, value2) => {
      return value1 != value2
    }
  }
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', __path_views + 'backend');

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'bootstrap')));
app.use(expressLayouts);

app.locals.systemConfig = systemConfig
app.use(`/${systemConfig.prefixAdmin}`, require('./mapp/routes/backend/index'));
app.use('/', require('./mapp/routes/frontend/index'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render(__path_views + 'pages/error', { pageTitle: 'Page Not Found' });
});

const uri = `mongodb://localhost:27017/${databaseConfig.database}`


mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("MongoDB Connected…")
  })
  .catch(err => console.log(err))

module.exports = app
