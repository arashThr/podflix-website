const hbs = require( 'express-handlebars');
const express = require('express')
const fs = require('fs')

const port = 8000
const app = express()

app.engine( 'hbs', hbs({
  extname: 'hbs'
}));

app.set('view engine', 'hbs');

const episodes = JSON.parse(fs.readFileSync('./episodes.json')).episodes
app.get('(/|/index.html)', function (req, res) {
  res.render('home', {
    episodes
  });
});

app.get('/ep/:id', function (req, res) {
  const id = req.params.id
  if (id < 0 || id > episodes.length) {
    res.sendStatus(404)
    return
  }
  if (episodes[id].locked) {
    res.send('This is locked')
    return
  }
  const data = Object.assign({}, episodes[id],  { epNumber: Number(id) + 1 })
  res.render('ep', data);
});

app.use('/images', express.static('images'))
app.use('/assets', express.static('assets'))

app.listen(port, () => console.log('Server started in port ' + port))
