const model = require("../../models/company");
//const user = require("../util/user");
const owner = require("../util/owner");
const permissions = require("./permissions");
const permission_prune = require("../util/permission_prune");
const retrieve = function(req) {
  return new Promise((resolve, reject) => {
    if (req.params.id) {
      //console.log(req.user);
      model.findOne({
          _id: req.params.id,
          host: req.user.host
        })
        .lean()
        .then((result) => {
          let authOwner = owner(req, result, true);
          if (result && authOwner) {
            permission_prune(req.user, result, permissions.retrieve)
              .then((result) => {
                resolve(result);
              });
          } else {
            if (!authOwner) {
              reject(new Error("Not authorised to view this company"))
            } else {
              reject(new Error("No data found"))
            }
          }
        }).catch((err) => {
          reject(err)
        });
    } else {
      reject(new Error('Undefined ID'))
    }
  })
}
module.exports = retrieve;
