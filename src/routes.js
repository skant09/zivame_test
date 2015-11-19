function routes(app){
	app.get('/*',function(req,res,next){
		res.render('sample',{
            pageTitle : 'Zivame',
            assets: {
							css: ['main'],
							js: ['main']
            }
        });
	});
};

module.exports = routes;
