const model = require("../../models/requirements");
//const owner = require("../util/owner");
//const permissions = require("./permissions");
//const permission_prune = require("../util/permission_prune");
const retrieve = function(req) {
  return new Promise((resolve, reject) => {
    //resolve({answer:"retrieve"})
      model.findOne({
        sending_country: req.params.from,
        receiving_country: req.params.to
      })
      .lean()
      .then((result)=>{
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      });
    /*if (req.params.id) {
      model.findOne({
          _id: req.params.id
          //, host: req.user.host
        })
        .lean()
        .then((result) => {
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
                reject(new Error("Not authorised to view this company"))
              } else {
                reject(new Error("No data found"))
              }
            }
          }
        }).catch((err) => {
          reject(err)
        });
    } else {
      reject(new Error('Undefined ID'))
    }*/
  })
}
module.exports = retrieve;
