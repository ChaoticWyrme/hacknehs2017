// ./routes/system.js
// login logic
const express = require('express');
var router = express.Router();

// routes
router.get('/', (req, res) => {
  if (req.query.error) {
    res.render('login', {
      error: true
    });
  } else {
    res.render('login');
  }
});

router.post('/', (req, res) => {

});

router.post('/register', (req, res) => {

});

// exports
module.exports = router;
