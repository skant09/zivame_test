var express = require('express');
import hbs from 'express-handlebars';
import path from 'path';

var app = express();

//set view-engine
app.engine('hbs', hbs({
	extname:'hbs',
	contentHelperName: 'content',
	defaultLayout: __dirname + '/public/component/index.hbs'
}));

app.set('view engine', 'hbs');

app.set('views', __dirname + '/public/component');

app.use('/public', express.static(__dirname + '/public'));

var routes = require('./routes')(app);
//Setting up port and starting express server
app.set('port', 3000);

var server = app.listen(app.get('port'), (req, res) =>
	console.log('Express server listening on port ' + app.get('port'))
);
