const model = require("../../models/invoice");
const owner = require("../util/owner");
const permissions = require("./permissions");
const permission_prune = require("../util/permission_prune");
const update = function(req) {
  return new Promise((resolve, reject) => {
    if (req.params.id) {
      model.findOne({
          "invoice_number": req.params.id
        })
        .lean()
        .then((result) => {
          let authOwner = owner(req, result);
          if (result && authOwner) {
            permission_prune(req.user, req.body, permissions.update)
              .then((pruneResult) => {
                model.findOneAndUpdate({
                    "invoice_number": req.params.id
                  }, pruneResult, {
                    new: true
                  })
                  .then((saveResult) => {
                    resolve(saveResult);
                  })
              });
          } else {
            if (!authOwner) {
              reject(new Error("Not authorised to update this invoice"))
            } else {
              reject(new Error("No data found"))
            }
          }
        }).catch((err) => {
          reject(err)
        });
    } else {
      reject(new Error('Undefined invoice number'))
    }
  })
}
module.exports = update;
