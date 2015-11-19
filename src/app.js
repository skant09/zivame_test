//sdfsdfsdf
var express = require('express');
import hbs from 'express-handlebars';
import path from 'path';

var app = express();
var routes = require('./routes')(app);

//set view-engine
app.engine('hbs', hbs({
    contentHelperName: 'content',
    defaultLayout: __dirname + '/views/index.hbs'
}));
app.set('view engine', 'hbs');

app.set('views', __dirname+'/views');

console.log(__dirname);
app.use('/app',express.static(path.join(__dirname, '/assets')));

//Setting up port and starting express server
app.set('port', 3000);

var server = app.listen(app.get('port'), (req, res) =>
  console.log('Express server listening on port ' + app.get('port'))
);
