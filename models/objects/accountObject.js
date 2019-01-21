const account = {
  username: String,
  password: {
    salt: String,
    hash: String
  },
  first_name: String,
  surname: String
}

module.exports = account;
