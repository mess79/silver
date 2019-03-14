// do not delete - inactivate

const model = require("../../models/account")
const owner = require("../util/owner");
const destroy = function(req) {
  return new Promise((resolve, reject) => {
    if (req.params.id) {
      model.findById(
          req.params.id
        )
        .then((result) => {
          let authOwner = owner(req, result, true);
          if (result && authOwner) {
            result.active = false;
            model.findByIdAndUpdate(
                req.params.id, result, {
                  new: true
                }
              )
              .then((resultNew) => {
                resolve(resultNew);
              })
          } else {
            if (!authOwner) {
              reject(new Error("Not authorised to deactivate this account"))
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
