const model = require("../../models/requirements")
const owner = require("../util/owner");
const permissions = require("./permissions");
const permission_prune = require("../util/permission_prune");
const create = function(req) {
  return new Promise((resolve, reject) => {
    let query = {
      "host": {
        $exists: false
      },
      "company": {
        $exists: false
      },
      "country_from": {
        $exists: false
      },
      "country_to": {
        $exists: false
      }
    }
    if (req.body.host) {
      query.host = req.body.host;
    }
    if (req.body.company) {
      query.company = req.body.company;
    }
    if (req.body.sending_country && req.body.receiving_country) {
      query.country_from = req.body.sending_country;
      query.country_to = req.body.receiving_country;
    }
    let authOwner

    if (req.body.owner) {
      authOwner = owner(req, query, true);
    }
    if (authOwner) {
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
      reject(new Error("Not authorised to high enough level to create Requirement documents"))
    }
  })
}
module.exports = create;
