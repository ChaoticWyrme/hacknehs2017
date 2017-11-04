const validate = require('./validate.js');
const hash = require('./hash.js');

class User {
  constructor(email, password, displayName) {
    if (typeof displayName === 'undefined') displayName = email;
    let validateObj = {email:email, password:password, displayName:displayName};
    if (!validate.user(validateObj)) throw new Error("invalid user");
    this.email = email;
    this.pass = hash.hash(password);
    this.displayName = displayName;
    db.id().then((id) => {
      this.id = id;
    });
    console.log(this.id);
  }
}

function userLoad(email, password, displayName) {
  return new User(email, password, displayName);
}

module.exports = {
  User: User,

}
