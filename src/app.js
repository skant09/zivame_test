const express = require('express');
import hbs from 'express-handlebars';
// import path from 'path';
// import widget from './public/common/widget';
const app = express();
const routes = require('./routes');
routes(app);

//	set view-engine
app.engine('hbs', hbs({
  extname: 'hbs',
  contentHelperName: 'content',
  defaultLayout: __dirname + '/public/component/index.hbs'
}));

app.set('view engine', 'hbs');

app.set('views', __dirname + '/public/component');

app.use('/public', express.static(__dirname + '/public'));


//	Setting up port and starting express server
app.set('port', 3000);

app.listen(app.get('port'), () =>
	console.log('Express server listening on port ' + app.get('port')) // eslint-disable-line no-console
);
