const hbs = require( 'express-handlebars');
const express = require('express')

const episodes = require('./episodes').episodes

const port = 8000
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

app.get('/about', (req, res) => {
  res.render('about')
})

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

app.listen(port, () => console.log('Server started in port ' + port))
