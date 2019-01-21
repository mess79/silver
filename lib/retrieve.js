const model = require("../models/person")
const retrieve = function(req) {
  return new Promise((resolve, reject) => {
    if (req.params.country && req.params.id) {
      model[req.params.country].findById(req.params.id)
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
      reject(new Error('Undefined country or ID'))
    }
  })
}
module.exports = retrieve;
