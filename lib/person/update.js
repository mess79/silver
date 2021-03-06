const model = require("../../models/person")
const owner = require("../util/owner");
const permissions = require("./permissions");
const permission_prune = require("../util/permission_prune");
const update = function(req) {
  return new Promise((resolve, reject) => {
    if (req.params.origin_country && req.params.id) {
      model[req.params.origin_country].findById(req.params.id)
        .lean()
        .then((result) => {
          if (!result) {
            reject(new Error("No data found"))
          } else {
            let authOwner = owner(req, result);
            if (result && authOwner) {
              permission_prune(req.user, req.body, permissions.update)
                .then((pruneResult) => {
                  model[req.params.origin_country].findByIdAndUpdate(req.params.id, pruneResult, {
                      new: true
                    })
                    .then((saveResult) => {
                      resolve(saveResult);
                    }).catch((err) => {
                      reject(err)
                    });
                })
            } else {
              reject(new Error("Account or Host not matched"))
            }
          }
        }).catch((err) => {
          reject(err)
        });
    } else {
      reject(new Error('Undefined country or ID'))
    }
  })
}
module.exports = update;
