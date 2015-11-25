function routes(app){
	app.get('/*',function(req,res,next){
		res.render('home/sample',{
            pageTitle : 'Zivame',
            assets: {
							css: ['main'],
							js: ['main']
            }
        });
	});
};

module.exports = routes;
