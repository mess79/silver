const model = require("../../models/requirements")
const owner = require("../util/owner");
const permissions = require("./permissions");
const permission_prune = require("../util/permission_prune");
const create = function(req) {
  return new Promise((resolve, reject) => {
    let authOwner = owner(req, true, false);
    if (authOwner) {
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
        .then((checkResult) => {
          if (!checkResult) {
            permission_prune(req.user, req.body, permissions.create)
              .then((pruneResult) => {
                model.create(pruneResult)
                  .then((result) => {
                    if (!result) {
                      reject(new Error("error creating requirements"))
                    } else {
                      resolve(result);
                    }
                  }).catch((err) => {
                    reject(err)
                  });
              })
              .catch((err) => {
                reject(err);
              })
          } else {
            reject(new Error("Requirement already exists"))
          }
        })
        .catch((err) => {
          reject(err)
        });
    } else {
      reject(new Error("Not authorised to high enough level to create Requiremant documents"))
    }
  })
}
module.exports = create;
