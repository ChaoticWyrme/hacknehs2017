// redis init
const redis = require('redis');
      client = redis.createClient();

client.on('error', function(err) {
  console.log("Error" + err);
});

const validate = require('./validate.js');

function registerUser(user) {
  // load user object into server
  // email: email address
  //
  if (!('email' in user && 'pass' in user && 'displayName' in user)) {
    throw new Error("invalid user");
  }
  var key = "user:"+user.email
  for (let entry of Object.entries(user)) {
    client.hset(key, entry[0], entry[1]);
  }
}

function getUser(email) {
  client.hgetall(`user:${email}`);
}
