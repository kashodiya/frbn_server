
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , register = require('./routes/register')
  , activation = require('./routes/activation')
  , unregister = require('./routes/unregister')
  , data = require('./routes/data')
  , uploadFile = require('./routes/uploadFile')
  , broadcast = require('./routes/broadcast')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose');


var connectionString = "mongodb://mongouser:password@alex.mongohq.com:10015/frbn1";
//var connectionString = "mongodb://localhost/frbn";
mongoose.connect(connectionString);
mongoose.model('Activation', require('./models/activation').Activation);
mongoose.model('Registration', require('./models/registration').Registration);
mongoose.model('Notification', require('./models/notification').Notification);


var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser({
    uploadDir: path.join(__dirname, 'download')
  }));
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use("/download", express.static(__dirname + '/download'));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.post('/activation', activation.index);
app.post('/activation/verify', activation.verifyToken);
app.post('/register', register.index);
app.post('/unregister', unregister.index);
app.post('/broadcast', broadcast.index);
app.post('/uploadFile', uploadFile.index);
app.get('/data/removeRegistration', data.removeRegistration);
app.get('/data/removeActivation', data.removeActivation);
app.get('/data/removeNotification', data.removeNotification);
app.get('/data/listOfActivations', data.listOfActivations);
app.get('/data/listOfRegistrations', data.listOfRegistrations);
app.get('/data/listOfNotifications', data.listOfNotifications);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
