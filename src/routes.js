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

console.log(__dirname);
app.use('/app',express.static(path.join(__dirname, '/assets')));

module.exports = routes;
