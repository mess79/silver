const _ = require("lodash");
const permission_prune = function(json, prune){
  return new Promise((resolve, reject) => {
    const roles = ["all", "client", "consultant", "manager", "company_admin", "server_admin", "superuser"]
    _.each(roles, function(role){
      _.each(prune[role], function(i){
        delete json[i]
      })
    })
    resolve(json);
  })
}

module.exports = permission_prune
