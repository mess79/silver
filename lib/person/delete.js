const model = require("../../models/person")
const owner = require("../util/owner");
const destroy = function(req) {
  return new Promise((resolve, reject) => {
    if (req.params.id) {
      model.all.findById(req.params.id)
        .then((result) => {
          if (!result) {
            reject(new Error("No data found"))
          } else {
            let authOwner = owner(req, result.account);
            if (result && authOwner && String(result.host) === req.user.host) {
              result.active = false;
              result.save()
                .then((result) => {
                  resolve({
                    message: "deleted: " + req.params.id
                  });
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
      reject(new Error('Undefined country or no data'))
    }
  })
}
module.exports = destroy;
