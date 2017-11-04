// ./validate.js
// all function return true or false

class ValidationError: Error {
  constructor(type) {
    switch (type) {
      case 'user':
        super("Invalid user.");
        this.type = 'user';
        break;
      case 'password':
      case 'pass':
        super("Invalid password");
        this.type = 'pass';
        break;
    }
  }
}

const patterns = {
  email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  password: /^.*{8,255}$/
}

function validateEmail(email) {
  return patterns.email.test(email);
}

function validatePass(password) {
  return patterns.password.test(password);
}

function validateUser(user) {
  var result = true;
  result = result &&
  'email' in user && validateEmail(user.email) &&
  'password' in user && validatePass(user.pass);
  return result;
}

function validateRegistration(user) {
  return validateUser(user) && (user.pass === user.passConfirm);
}

module.exports = {
  password: validatePass,
  email: validateEmail,
  user: validateUser
  login: validateUser,
  register: validateRegistration
}
