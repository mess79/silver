const _ = require("lodash")

const routes = function(express, app) {
  const routeObject = {
    verify: require('./verify')(express),
    account: require('./account')(express),
    person_data: require("./person_data")(express),
    auth: require("./auth")(express),
    scripts: require("./scripts")(express),
    order: require("./orders")(express),
    invoice: require("./invoice")(express),
    company: require("./company")(express),
    host: require("./hosts")(express),
    requirements: require("./requirements")(express),
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
