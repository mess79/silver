const model = require("../../models/host");
//const owner = require("../util/owner");
const update = function(req) {
  return new Promise((resolve, reject) => {
    /*if (req.params.id) {
      model.findOne({
          "order_number": req.params.id
        })
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
        }
      else {
        reject(new Error('Undefined order number'))
      }*/
  })
}
module.exports = update;
