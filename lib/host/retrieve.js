const model = require("../../models/host");
const user = require("../util/user");
//const owner = require("../util/owner");
const retrieve = function(req) {
  return new Promise((resolve, reject) => {
    console.log(req.params.name)
    model.findOne({
        name: req.params.name
      })
      .lean()
      .then((result) => {
        if (result) {
          resolve(result);
        } else {
          reject(new Error("No data found"))
        }
      }).catch((err) => {
        reject(err)
      });
  })
}
module.exports = retrieve;
