const model = require("../../models/requirements");
const owner = require("../util/owner");
const permissions = require("./permissions");
const permission_prune = require("../util/permission_prune");
const update = function(req) {
  return new Promise((resolve, reject) => {
    permission_prune(req.user, req.body, permissions.update)
      .then((pruneResult) => {
        let query = {
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
        model.findOneAndUpdate(query, pruneResult, {
            new: true
          })
          .then((saveResult) => {
            let authOwner = owner(req, saveResult, true);
            if (saveResult && authOwner) {
              if (!saveResult) {
                reject(new Error("error updating requirements"))
              } else {
                resolve(saveResult);
              }
            } else {
              if (!authOwner) {
                reject(new Error("Not authorised to update this requirement"))
              } else {
                reject(new Error("No data found"))
              }
            }
          })
          .catch((err) => {
            reject(err)
          });
      })
      .catch((err) => {
        reject(err)
      });
  })
}
module.exports = update;
