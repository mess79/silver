const _ = require("lodash")

const routes = function(express, app) {
  const routeObject = {
    verify: require('./verify')(express),
    person_country: require("./person_country")(express),
    auth: require("./authentication")(express),
    pages : require("./pages")(express),
    js: require("./js")(express),
    order: require("./orders")(express),
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
