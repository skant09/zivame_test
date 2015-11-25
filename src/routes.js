function routes(app) {
  app.get('/*', (req, res)=>{
    res.render('home/sample', {
      pageTitle: 'Zivame',
      assets: {
        css: ['main'],
        js: ['main']
      }
    });
  });
}

module.exports = routes;
