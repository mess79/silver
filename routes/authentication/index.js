//routes middleware for logon

const auth = function(express) {

  return {
    register: require("./register")(express),
    logon: require("./logon")(express),
    logout: require("./logoff")(express),
    reset: require("./reset")(express),
    resetSubmit: require("./resetSubmit")(express),
    activate: require("./activate")(express)
  }
}

module.exports = auth;
