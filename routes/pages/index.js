const pages = function(express) {

  return {
    //admin: require("./admin")(express),
    //consultant: require("./consultant")(express),
    //client: require("./client")(express),
    pages: require("./pages")(express)
  }
}

module.exports = pages;
