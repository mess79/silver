// do not delete - inactivate

const model = require("../../models/order")
const owner = require("../util/owner");
const destroy = function(req) {
  return new Promise((resolve, reject) => {
    if (req.params.id) {
      model.findOne({
          order_number: req.params.id
        })
        .then((result) => {
          let authOwner = owner(req, result.account);
          if (result && authOwner && String(result.host) === req.user.host) {

            result.active = false;
            result.save()
              .then((result) => {
                resolve(result);
              })
          } else {
            if (!authOwner) {
              reject(new Error("Not authorised to deactivate this order"))
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
module.exports = destroy;
