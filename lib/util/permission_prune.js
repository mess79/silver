const _ = require("lodash");
const permission_prune = function(role, json, prune) {
  return new Promise((resolve, reject) => {
    _.each(prune.all, function(i) {
      delete json[i]
    })
    //console.log(role.role);
    if (role && role.role) {
      _.each(prune[role.role], function(i) {
        delete json[i]
      })
    }
    resolve(json);
  })
}

module.exports = permission_prune
