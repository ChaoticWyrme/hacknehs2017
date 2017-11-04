// ./validate.js
// all function return true or false

const log = false;

class ValidationError {
  constructor(type) {
    switch (type) {
      case 'user':
        this.message = "Invalid user";
        this.type = 'user';
        break;
      case 'password':
      case 'pass':
        this.message = "Invalid password";
        this.type = 'pass';
        break;
    }
  }
}

const patterns = {
  email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  password: /^.{8,255}$/
}

function validateEmail(email) {
  var result = patterns.email.test(email);
  if (log && !result) console.log('email error');
  return result;
}

function validatePass(password) {
  var result =  patterns.password.test(password);
  if (log && !result) {
    console.log('password error');
  }
  return result;
}

function validateUser(user) {
  var emailCheck = typeof user.email === 'string' && validateEmail(user.email);
  var passCheck = typeof user.pass === 'string' && validatePass(user.pass);
  var result = emailCheck && passCheck;
  if (log) console.log(`email: ${emailCheck}, pass: ${passCheck}, result: ${result}`);
  return result;
}

function validateRegistration(user) {
  return validateUser(user) && (user.pass === user.passConfirm);
}

module.exports = {
  password: validatePass,
  email: validateEmail,
  user: validateUser,
  login: validateUser,
  register: validateRegistration,
  ValidationError: ValidationError
}
