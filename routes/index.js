const _ = require("lodash")

const routes = function(express, app) {
  const routeObject = {
    verify: require('./verify')(express),
    person_country: require("./person_country")(express),
    auth: require("./auth")(express),
    js: require("./js")(express),
    order: require("./orders")(express),
    host: require("./hosts")(express),
    pages: require("./pages")(express),
    errors: require("./errors")
  }
  return function() {
    _.each(Object.keys(routeObject), function(routeList) {
      _.each(Object.keys(routeObject[routeList]), function(route) {
        app.use(routeObject[routeList][route]);
      })
    })
  }
}

module.exports = routes;
