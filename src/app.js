const express = require('express');
import hbs from 'express-handlebars';
const app = express();
const routes = require('./routes');


//	set view-engine
app.engine('hbs', hbs({
  extname: 'hbs',
  contentHelperName: 'content',
  defaultLayout: __dirname + '/views/index.hbs'
}));

app.set('view engine', 'hbs');

app.set('views', __dirname + '/views');

app.use('/public', express.static(__dirname + '/public'));
app.use('/node_modules', express.static('../../node_modules'));

//  set the default route at the last
routes(app);
//	Setting up port and starting express server
app.set('port', 3000);

app.listen(app.get('port'), () =>
	console.log('Express server listening on port ' + app.get('port')) // eslint-disable-line no-console
);
