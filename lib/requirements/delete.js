// do not delete - inactivate

const model = require("../../models/requirements")
const owner = require("../util/owner");
const destroy = function(req) {
  return new Promise((resolve, reject) => {

    if (req.params.sending_country&& req.params.receiving_country) {
      //resolve(req.params)

      model.findOne({
          country_from: req.params.sending_country,
          country_to: req.params.receiving_country
        })
        .then((checkResult) => {
          let authOwner = owner(req, true, true);
          if (checkResult && authOwner) {
            checkResult.active = false;
            model.findByIdAndUpdate(
                checkResult._id, checkResult, {
                  new: true
                }
              )
              .then((result) => {
                resolve(result);
              })
          } else {
            if (!authOwner) {
              reject(new Error("Not authorised to deactivate this requirement"))
            } else {
              reject(new Error("No data found"))
            }
          }
        })
        .catch((err) => {
          reject(err)
        });
    } else {
      reject(new Error('Undefined ID'))
    }
  })
}
module.exports = destroy;
