import loader from 'es6-module-loader';
let System = loader.System;
System.transpiler = 'babel';

var express = require('express');
let hbs = System.import('express-handlebars');


var app = express();
var routes = require('./routes')(app);


//set view-engine
app.engine('hbs', hbs({
    contentHelperName: 'content',
    defaultLayout: __dirname + '/views/index.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname+'/views');

//Setting up port and starting express server
app.set('port', process.env.NODE_PORT || 3000);
var server = app.listen(app.get('port'), (req, res) =>
  console.log('Express server listening on port ' + app.get('port'))
);
