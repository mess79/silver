const model = require("../../models/person")
const owner = require("../util/owner");
const update = function(req) {
  return new Promise((resolve, reject) => {
    if (req.params.country && req.params.id) {
      model[req.params.country].findById(req.params.id)
        //.lean()
        .then((result) => {
          if (!result) {
            reject(new Error("No data found"))
          } else {
            let authOwner = owner(req, result.account);
            if (result && authOwner && String(result.host) === req.user.host) {
              //console.log(req.body)
              model[req.params.country].findByIdAndUpdate(req.params.id, req.body, {
                  new: true
                })
                .then((saveResult) => {
                  //console.log(req.params.country);
                  resolve(saveResult);
                }).catch((err) => {
                  reject(err)
                });

            } else {
              reject(new Error("Account or Host not matched"))
            }
          }
        }).catch((err) => {
          reject(err)
        });
    } else {
      reject(new Error('Undefined country or ID'))
    }
  })
}
module.exports = update;
