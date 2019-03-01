const model = require("../../models/order")
const _ = require("lodash");
const create = function(req) {
  return new Promise((resolve, reject) => {
    req.body.host = req.user.host
    let exists = _.indexOf(req.body.account, req.user.subject);
    if(exists<0){
      req.body.account.push(req.user.subject)
    }
    model.create(req.body)
      .then((result) => {
        if (!result) {
          reject(new Error("error creating order"))
        } else {
          resolve(result);
        }
      }).catch((err) => {
        reject(err)
      });
  })
}
module.exports = create;
