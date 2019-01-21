//routes middleware for logon

const auth = function(express) {

  return {
    register: require("./register")(express),
    logon: require("./logon")(express),
    logout: require("./logoff")(express)
  }
}

module.exports = auth;
