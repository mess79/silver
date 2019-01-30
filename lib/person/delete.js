const model = require("../../models/person")
const destroy = function(req){
  return new Promise((resolve, reject) => {
    if (req.params.id) {
      model.all.findByIdAndRemove(req.params.id)
        .then((result) => {
          if (!result) {
            reject(new Error("No data found"))
          } else {
            resolve({message: "deleted: " + req.params.id});
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
