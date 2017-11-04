const validate = require('./validate.js');
const pass = require('./pass.js')

class User {
  constructor(email, password, displayName) {
    if (typeof displayName === 'undefined') displayName = email;
    let validateObj = {email:email, password:password, displayName:displayName};
    if (!validate.user(validateObj)) throw new Error("invalid user");

    this.email = email;
    this.pass = pass.hash(password);
    this.displayName = displayName;
  }
}
