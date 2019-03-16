const model = require("../../models/host");
const _ = require("lodash");
const permissions = require("./permissions");
const permission_prune = require("../util/permission_prune");

const update = function(req) {
  return new Promise((resolve, reject) => {
    if (req.params.name && req.user && _.indexOf(["server_admin", "superuser"], req.user.role) !== -1) {
      //if (req.params.id) {
        model.findOne(
            {name: req.params.name}
          )
          .lean()
          .then((result) => {
            if (result) {
              permission_prune(req.user, req.body, permissions.update)
                .then((pruneResult) => {
                  model.findOneAndUpdate(
                      {name: req.params.name}, pruneResult, {
                        new: true
                      })
                    .then((saveResult) => {
                      resolve(saveResult);
                    })
                });
            } else {
              //if (!authOwner) {
                //reject(new Error("Not authorised to update this host"))
              //} else {
                reject(new Error("No data found"))
              //}
            }
          }).catch((err) => {
            reject(err)
          });
      } else {
        reject(new Error('Error or undefined hostname in route'))
      }
    //}
  })
}
module.exports = update;
