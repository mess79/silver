const model = require("../../models/host");
const user = require("../util/user");
//const owner = require("../util/owner");
const retrieve = function(req) {
  return new Promise((resolve, reject) => {
    /*if (req.params.id) {
      model.findOne({
          order_number: req.params.id,
          account: req.user.subject
        })
        .lean()
        .then((result) => {
          let authOwner = owner(req, result.account);
          if (result && authOwner) {
              resolve(result);
            } else {
              if (!authOwner) {
                reject(new Error("Not authorised to view this order"))
              } else {
                reject(new Error("No data found"))
              }
            }
        }).catch((err) => {
          reject(err)
        });
    } else {
      reject(new Error('Undefined ID'))
    }*/
  })
}
module.exports = retrieve;
