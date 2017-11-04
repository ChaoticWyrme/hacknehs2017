// redis init
const bluebird = require('bluebird');
const redis = require('redis');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
const client = redis.createClient();

client.on('error', function(err) {
  console.log("Error" + err);
});

const validate = require('./validate.js');
const hash = require('./hash');

async function registerUser(user) {
  // load user object into server
  // key is "user:user.id"
  // email: user.email // user email / login
  // pass: user.pass // hashed password
  // displayName: user.displayName
  var key = `user:${user.id}`;
  if(await client.existsAsync(key)) {
    return false;
  }
  client.hmset(key, ['email', user.email, 'pass', user.pass, 'displayName', user.displayName]);
  client.set(`login:${user.email}`, user.id);
  return true;
}

async function authUser(user) {
  // user: {email, pass} pass=hashed password
  return client.getAsync(`login:${user.email}`)
  .then((id) => {
    return client.hmget(`user:${user.id}`, 'email', 'pass');
  })
  .then((dbUser) => {
    if (user.email === dbUser[0] && hash.check(user.pass, passdbUser[1])) {
      return true;
    } else {
      return false;
    }
  }).catch(() => {
    return false;
  });

}

async function getUser(email) {
  return await client.hgetallAsync(`user:${email}`).then((dbUser) => {
    var user = {email: email};
    for (let entry of Object.entries(dbUser)) {
      user[entry[0]] = entry[1];
    }
    return user;
  });
}

function getUID() {
  return await user.incrAsync();
}


module.exports = {
  id: getUID,
  register: registerUser,
  login: authUser
}
