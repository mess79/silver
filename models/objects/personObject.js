//const countryObj = require("./countryObject");
const _ = require('lodash');
const countryMap = require('./country/map')
const common = require('./common/default')

const obj = function(country) {

  let countryOutput = {};
  if (!_.isArray(country)) {
    if (!country) {
      country = Object.keys(countryMap);
    } else {
      country = [country];
    }
  }

  _.each(country, function(i) {
    _.each(countryMap[i], function(a, b) {
      if (a.import) {
        _.each(a.import, function(c, d) {
          //console.log(_.isArray(c));
          if (c.type === "date") {
            a.import[d] = Date
          } else if (_.isArray(c)) {
            a.import[d] = c
          } else {
            a.import[d] = String
          }
        })
        countryOutput = _.assignIn(countryOutput, a.import);
      }
      if (a.custom) {
        if (a.custom.import) {
          a.custom = _.assignIn(a.custom, a.custom.import)
          delete a.custom.import
        }
        _.each(a.custom, function(e, f) {
          if (e.type === "date") {
            a.custom[f] = Date
          } else if (_.isArray(e)) {
            a.import[f] = e
          } else {
            a.custom[f] = String
          }
        })
        countryOutput[i] = _.assignIn(countryOutput[i], a.custom)
      }
    })
  })
  countryOutput = _.assignIn(countryOutput, common);
  return countryOutput
}

module.exports = obj;
