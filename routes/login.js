// ./routes/login.js
// login logic
const express = require('express');
var router = express.Router();

const db = require('../db');
const validate = require('../validate');
const User = require('../user');

// routes
router.get('/', (req, res) => {
  if ('error' in req.query) {
    res.render('login', {
      layout: 'base',
      error: true
    });
  } else if ('success' in req.query) {
    res.render('login', {
      layout: 'base',
      success: true
    });
  } else {
    console.log(req.query);
    res.render('login', {
      layout: 'base'
    });
  }
});

router.post('/register', (req, res) => {
  let body = req.body;
  body.displayName = body.displayName || body.email;
  if (!validate.register(body)) {
    console.log('validation error');
    res.redirect('/login?error=validation#register');
  } else {
    try {
      let user = new User(body.email, body.pass, body.displayName);
    } catch(err) {
      console.log('user init error');
      console.log(err);
      res.redirect('/login?error=userInit#register');
      return;
    }
    let result = db.register(body);
    if (result) {
      res.redirect('/login?success');
    } else {
      console.log('db error');
      res.redirect('/login?error=dbReg#register')
    }
  }
});

router.post('/', (req, res) => {
  let body = req.body;
  if (!validate.login(body)) {
    console.log('login error');
    res.redirect('/login?=error=login');
  } else {
    var result = db.login(body);
    if (result) {
      res.redirect('/');
    } else {
      res.redirect('/login?error');
    }
  }
});


// exports
module.exports = router;
