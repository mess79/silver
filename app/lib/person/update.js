const model = require("../../models/person")
const update = function(req){
  return new Promise((resolve, reject) => {
    if (req.params.country && req.params.id) {
      //console.log(req.params.country);
      //console.log(req.body);
      model[req.params.country].findByIdAndUpdate(req.params.id, req.body, {new: true})
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
module.exports = update;
