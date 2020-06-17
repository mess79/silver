const model = require("../../models/requirements");
const owner = require("../util/owner");
const permissions = require("./permissions");
const permission_prune = require("../util/permission_prune");
const retrieve = function(req) {
  return new Promise((resolve, reject) => {
    let query = {
      "host" : req.user.host,
      "country_from": {$exists: false},
      "country_to": {$exists: false}
    }
    if(req.params.sending_country && req.params.receiving_country){
      query.country_from = req.params.sending_country
      query.county_to = req.params.receiving_country
    }
    model.findOne(query)
      .lean()
      .then((result) => {
        if (!result) {
          reject(new Error("No data found"))
        } else {
          if (!result) {
            reject(new Error("No data found"))
          } else {
            let authOwner = owner(req, result, false);
            if (result && authOwner) {
              permission_prune(req.user, result, permissions.retrieve)
                .then((result) => {
                  resolve(result);
                });
            } else {
              if (!authOwner) {
                reject(new Error("Not authorised to view this requirement"))
              } else {
                reject(new Error("No data found"))
              }
            }
          }
        }
      })
      .catch((err) => {
        reject(err)
      });
  })
}
module.exports = retrieve;
