//routes middleware for logon

const auth = function(express) {

  return {
    register: require("./register")(express),
    logon: require("./logon")(express),
    logout: require("./logoff")(express),
    resetSubmit: require("./resetSubmit")(express),
    resetRequest: require("./resetRequest")(express),
    activate: require("./activate")(express),
    activated: require("./activated")(express)
  }
}

module.exports = auth;
