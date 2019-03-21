const model = require("../../models/invoice");
//const user = require("../util/user");
const owner = require("../util/owner");
const permissions = require("./permissions");
const permission_prune = require("../util/permission_prune");
const retrieve = function(req) {
  return new Promise((resolve, reject) => {
    //console.log(req.user);
    if (req.params.id) {
      model.findOne({
          invoice_number: req.params.id,
          account: req.user.subject
        })
        .lean()
        .then((result) => {
          let authOwner = owner(req, result);
          if (result && authOwner) {
            permission_prune(req.user, result, permissions.retrieve)
              .then((result) => {
                resolve(result);
              });
          } else {
            if (!authOwner) {
              reject(new Error("Not authorised to view this invoice"))
            } else {
              reject(new Error("No data found"))
            }
          }
        }).catch((err) => {
          console.log(err);
          reject(err)
        });
    } else {
      reject(new Error('Undefined ID'))
    }
  })
}
module.exports = retrieve;
