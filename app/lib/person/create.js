const model = require("../../models/person")
const create = function(req){
  return new Promise((resolve, reject) => {
    if (req.params.country && req.body) {
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
