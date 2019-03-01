const model = require("../../models/person")
const _ = require("lodash");
const create = function(req) {
  return new Promise((resolve, reject) => {
    if (req.params.country && req.body) {
      req.body.host = req.user.host
      let exists = _.indexOf(req.body.account, req.user.subject);
      if (exists < 0) {
        req.body.account.push(req.user.subject)
      }
      model[req.params.country].create(req.body)
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
      reject(new Error('Undefined country or no data'))
    }
  })
}
module.exports = create;
