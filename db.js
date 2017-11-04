// redis init
const redis = require('redis');
      client = redis.createClient();

client.on('error', function(err) {
  console.log("Error" + err);
});

const bcrypt = require('bcrypt');
const saltRounds = 10;

function hashPass(password, cb) {
  if (typeof cb !== 'function') {
    return bcrypt.hash(password, saltRounds)
  } else {
    bcrypt.hash(password, saltRounds).then(cb);
  }
}

function checkPass(plaintext, hash, cb) {
  if (typeof cb === 'function') {
    bcrypt.compare(plaintext, hash).then(cb);
  } else {
    return bcrypt.compare(plaintext, hash);
  }
}

function registerUser(settings) {
  // load user object into server
  
}
