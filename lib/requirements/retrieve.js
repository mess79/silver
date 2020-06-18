const model = require("../../models/requirements");
const owner = require("../util/owner");
const permissions = require("./permissions");
const permission_prune = require("../util/permission_prune");
const retrieve = function(req) {
  return new Promise((resolve, reject) => {
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
    //console.log(query);
    model.findOne(query)
      .lean()
      .then((result) => {
        if (!result) {
          reject(new Error("No data found"))
        } else {
          if (!result) {
            reject(new Error("No data found"))
          } else {
            let authOwner = owner(req, result, true);
            if (result && authOwner) {
              permission_prune(req.user, result, permissions.retrieve)
                .then((result) => {
                  resolve(result);
                });
            } else {
              if (!authOwner) {
                reject(new Error("Not authorised to view this requirement"))
              } else {
                reject(new Error("No data found"))
              }
            }
          }
        }
      })
      .catch((err) => {
        reject(err)
      });
  })
}
module.exports = retrieve;
