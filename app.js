const hbs = require( 'express-handlebars');
const express = require('express')

const episodes = require('./episodes').episodes

const port = 9000
const app = express()

app.engine( 'hbs', hbs({
  extname: 'hbs'
}));

app.set('view engine', 'hbs');

app.get('(/|/index.html)', function (req, res) {
  res.render('home', {
    episodes
  });
});

app.get('/about', (req, res) => res.render('about'))
app.get('/buy', (req, res) => res.render('buy'))

app.get('/ep/:slug', function (req, res) {
  const slug = req.params.slug
  const ep = episodes.filter(e => e.slug === slug)[0]
  if (!ep) {
    res.sendStatus(404)
    return
  }
  if (ep.locked) {
    res.send('This is locked')
    return
  }
  res.render('ep', ep);
});

app.use('/images', express.static('images'))
app.use('/assets', express.static('assets'))
app.use('/favicon.ico', express.static('images/favicon.ico'));

app.listen(port, () => console.log('Server started in port ' + port))

/*
// https://gist.github.com/joepie91/c0069ab0e0da40cc7b54b8c2203befe1#gistcomment-2202216
app.get('*', (req, res) => {
  res.render('static' + req.url, function(err, html) {
    if(!err) { return res.send(html) }
    // Not super elegant the `indexOf` but useful
    if (err.message.indexOf('Failed to lookup view') !== -1) {
      return res.render('root/error')
    }
    throw err
  })
})
*/
