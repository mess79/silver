const model = require("../../models/requirements")
//const _ = require("lodash");
const permissions = require("./permissions");
const permission_prune = require("../util/permission_prune");
const create = function(req) {
  return new Promise((resolve, reject) => {
    model.findOne({
        country_from: req.body.country_from,
        country_to: req.body.country_to
      })
      .lean()
      .then((result) => {
        if (!result) {
          permission_prune(req.user, req.body, permissions.create)
            .then((pruneResult) => {
              resolve(pruneResult);
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
  })
}
module.exports = create;
