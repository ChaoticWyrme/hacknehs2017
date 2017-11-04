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

module.exports = {
  hash: hashPass,
  check: checkPass
};
