// entry file
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const exphbs  = require('express-handlebars');

// routes
const login = require('./routes/login');

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
    styleSrc: ["'self'", 'maxcdn.bootstrapcdn.com'],
    scriptSrc: ["'self'", 'use.fontawesome.com']
  }
}));

app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  if ('body' in req) console.log(req.body);
});

app.use(cookieSession({
  name: 'session',
  secret: 'nomNomNomOnSandvich'
}));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('idea-list', {
    ideas: [
      {
        title: "Test Idea",
        author: "Some Genius",
        description: "Be blown away by this amazing idea",
        score: "10",
        tags: [
          "cool",
          "mind_blowing",
          "best_thing_ever"
        ]
      }
    ]
  });
});

app.use('/login', login);

// app.get('/user', );
const port = 3000;
const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
