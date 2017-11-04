const validate = require('./validate.js');
const hash = require('./hash.js');
const db = require('./db');

class User {
  constructor(email, password, displayName) {
    var validateObj = {email: email, pass: password, }
    validateObj.displayName = displayName || email;

    if (!validate.user(validateObj)) {
      console.log(validateObj);
      throw new Error("invalid user");
    }
    this.email = email;
    this.pass = hash.hash(password);
    this.displayName = displayName;
    db.id().then((id) => {
      this.id = id;
      console.log(id);
    });
  }
}

function userLoad(email, password, displayName) {
  return new User(email, password, displayName);
}

module.exports = User;
