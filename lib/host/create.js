const model = require("../../models/host")
const _ = require("lodash");
const create = function(req) {
  return new Promise((resolve, reject) => {
    model.create(req.body)
      .then((result) => {
        if (!result) {
          reject(new Error("error creating host"))
        } else {
          resolve(result);
        }
      }).catch((err) => {
        reject(err)
      });
  })
}
module.exports = create;
