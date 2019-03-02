const model = require("../../models/order");
const owner = require("../util/owner");
const update = function(req) {
  return new Promise((resolve, reject) => {
    if (req.params.id) {
      model.findOne({
          "order_number": req.params.id
        })
        .lean()
        .then((result) => {
          let authOwner = owner(req, result);
          if (result && authOwner) {
            req.body.account = result.account
            req.body.host = result.host
            model.findOneAndUpdate({
                "order_number": req.params.id
              }, req.body, {
                new: true
              })
              .then((saveResult) => {
                resolve(saveResult);
              })
          } else {
            if (!authOwner) {
              reject(new Error("Not authorised to update this order"))
            } else {
              reject(new Error("No data found"))
            }
          }
        }).catch((err) => {
          reject(err)
        });
    } else {
      reject(new Error('Undefined order number'))
    }
  })
}
module.exports = update;
