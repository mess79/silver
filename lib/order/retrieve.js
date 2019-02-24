const model = require("../../models/order");
const user = require("../util/user");
const retrieve = function(req) {
  return new Promise((resolve, reject) => {
    if (req.params.id) {
      model.findOne({
          order_number: req.params.id,
          account: req.user.subject
        })
        .lean()
        .then((result) => {
          if (!result) {
            reject(new Error("No data found"))
          } else {
            resolve(result);
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
