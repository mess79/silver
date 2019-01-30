const argon2 = require('argon2');
const cryptoRandomString = require('crypto-random-string');

const auth = {
  create: function(password) {
    return new Promise((resolve, reject) => {
      let salt = cryptoRandomString(32);
      password += salt;
      argon2.hash(password, {
        type: argon2.argon2d
      }).then(hash => {
        let result = {
          salt: salt,
          hash: hash
        }
        resolve(result);
      }).catch(err => {
        reject(err);
      });

    })

  },
  verify: function(inputPassword, storedPassword) {
    return new Promise((resolve, reject) => {
      inputPassword += storedPassword.salt
      argon2.verify(storedPassword.hash, inputPassword)
        .then(match => {
          resolve(match);
        }).catch(err => {
          reject(err)
        });
    }).catch(err => {
      console.log(err)
    });
  }
}

module.exports = auth;
