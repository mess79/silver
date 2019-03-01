const model = require("../../models/host")
const _ = require("lodash");
const create = function(req) {
  return new Promise((resolve, reject) => {
    //console.log(req.user);
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
