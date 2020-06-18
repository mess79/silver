// do not delete - inactivate

const model = require("../../models/requirements")
const owner = require("../util/owner");
const destroy = function(req) {
  return new Promise((resolve, reject) => {
    console.log(req.params)
    if (req.params) {
      let query = {
        "host": {
          $exists: false
        },
        "company": {
          $exists: false
        },
        "country_from": {
          $exists: false
        },
        "country_to": {
          $exists: false
        }
      }
      if (req.params.hostid) {
        query.host = req.params.hostid;
      }
      if (req.params.companyid) {
        query.company = req.params.companyid;
      }
      if (req.params.sending_country && req.params.receiving_country) {
        query.country_from = req.params.sending_country;
        query.country_to = req.params.receiving_country;
      }
      model.findOne(query)
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
      reject(new Error('Undefined params'))
    }
  })
}
module.exports = destroy;
