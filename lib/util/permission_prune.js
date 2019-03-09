const _ = require("lodash");
const permission_prune = function(role, json, prune) {
  return new Promise((resolve, reject) => {
    _.each(prune.all, function(i) {
      delete json[i]
    })
    if (role && role.user) {
      _.each(prune[role.user], function(i) {
        delete json[i]
      })
    }
    resolve(json);
  })
}

module.exports = permission_prune
