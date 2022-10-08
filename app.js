var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var showRouter = require('./routes/show');
var adminRouter = require('./routes/admin');
var authRouter = require('./routes/auth');
var gatpatRouter = require('./routes/gatpat');
var ninecommonRouter = require('./routes/ninecommon');
var netsatRouter = require('./routes/netsat');

var app = express();

const session = require('express-session');

app.use(cookieParser());
app.use(
  session({
    secret: 'my_super_secret',
    resave: false,
    saveUninitialized: false
  })
);

const monk = require('monk')

// Connection URL
const url = 'localhost:27017/projectxml';

const db = monk(url);

db.then(() => {
  console.log('Connected correctly to server')
})
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/show', showRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.use('/GATPAT', gatpatRouter);
app.use('/ninecommon', ninecommonRouter);
app.use('/NETSAT', netsatRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
