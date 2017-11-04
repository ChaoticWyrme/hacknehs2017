// entry file
const express = require('express');
const exphbs  = require('express-handlebars');

const app = express();

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}));
app.set('view-engine', '.hbs');


app.use(express.static('public'));
// app.get('/user', );
const server = app.listen(3000);
