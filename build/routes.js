'use strict';

function routes(app) {
	app.get('/*', function (req, res, next) {
		res.render('sample');
	});
};

module.exports = routes;