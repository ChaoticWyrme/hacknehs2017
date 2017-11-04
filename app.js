// entry file
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const exphbs  = require('express-handlebars');

// routes
const login = require('./routes/login.js')

const app = express();

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.set('trust proxy', 1);

app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'", 'maxcdn.bootstrapcdn.com']
  }
}));

app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieSession({
  name: 'session',
  secret: 'nomNomNomOnSandvich'
}));

app

app.use(express.static('public'));
// app.get('/user', );
const server = app.listen(3000);
