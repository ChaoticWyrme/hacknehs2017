// ./routes/login.js
// login logic
const express = require('express');
var router = express.Router();

const db = require('../db');
const validate = require('../validate');

// routes
router.get('/', (req, res) => {
  console.log('login visit');
  console.log(req.query);
  if (req.query.error) {
    res.render('login', {
      error: true
    });
  } else {
    res.render('login');
  }
});

router.post('/', (req, res) => {
  let body = req.body;
  if (!validate.login(body)) {
    res.redirect(400, '/login?error');
  } else {
    db.login(body);
  }
});

router.post('/register', (req, res) => {
  let body = req.body;
  body.displayName = displayName || body.email;
  if (!validate.register(body)) {
    res.redirect(400, '/login?error#register');
  } else {
    try {
      let user = new User(body.email, body.pass, body.displayName);
    } catch(err) {
      res.redirect(400, '/login?error#register');
    }
    let result = db.register(user);
    if (result) {
      res.redirect('/login?success');
    } else {
      res.redirect('/login?error#register')
    }
  }
});

// exports
module.exports = router;
