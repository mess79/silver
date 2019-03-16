// do not delete - inactivate

const model = require("../../models/host")
const _ = require("lodash");
const destroy = function(req) {
  return new Promise((resolve, reject) => {
    console.log(req.user);
    if (req.user && _.indexOf(["server_admin", "superuser"], req.user.role) !== -1) {
      model.findOne({
          name: req.params.name
        })
        .then((result) => {
          if (result) {
            result.active = false;
            model.findOneAndUpdate({
                name: req.params.name
              }, result, {
                new: true
              })
              .then((resultNew) => {
                resolve(resultNew);
              })
          } else {
            reject(new Error("No data found"))
          }
        }).catch((err) => {
          reject(err)
        });
    } else {
      reject(new Error('Undefined name'))
    }
  })
}
module.exports = destroy;
