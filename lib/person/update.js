const model = require("../../models/person")
const owner = require("../util/owner");
const update = function(req) {
  return new Promise((resolve, reject) => {
    if (req.params.country && req.params.id) {
      model[req.params.country].findById(req.params.id)
        .lean()
        .then((result) => {
          if (!result) {
            reject(new Error("No data found"))
          } else {
            let authOwner = owner(req, result);
            if (result && authOwner) {
              model[req.params.country].findByIdAndUpdate(req.params.id, req.body, {
                  new: true
                })
                .then((saveResult) => {
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
