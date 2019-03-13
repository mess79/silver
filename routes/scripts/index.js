const scripts = function(express) {
  return {
    js: require("./js")(express),
    css: require("./css")(express)
  }
}
module.exports = scripts;
