'use strict';

var _es6ModuleLoader = require('es6-module-loader');

var _es6ModuleLoader2 = _interopRequireDefault(_es6ModuleLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var System = _es6ModuleLoader2.default.System;
System.transpiler = 'babel';

var express = require('express');
var hbs = System.import('express-handlebars');

var app = express();
var routes = require('./routes')(app);

//set view-engine
app.engine('hbs', hbs({
    contentHelperName: 'content',
    defaultLayout: __dirname + '/views/index.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

//Setting up port and starting express server
app.set('port', process.env.NODE_PORT || 3000);
var server = app.listen(app.get('port'), function (req, res) {
    return console.log('Express server listening on port ' + app.get('port'));
});