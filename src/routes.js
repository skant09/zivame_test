function routes(app) {
  app.get('/*', (req, res)=>{
    res.render('sample', {
      pageTitle: 'Zivame',
      assets: {
        css: ['main'],
        js: ['main']
      }
    });
  });
}
module.exports = routes;
