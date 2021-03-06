//const path = require("path");

const lib = require("../../lib/requirements");

const requirements = function(express) {
  const router = express.Router();

  router.route(["/requirements", "/requirements/:owner", "/requirements/host/:hostid", "/requirements/company/:companyid", "/requirements/from/:sending_country/to/:receiving_country" ])
    .get(function(req, res, next) {
      lib.retrieve(req)
        .then(function(result) {
          res.json(result)
        })
        .catch(function(err) {
          res.json({
            error: err.message
          });
        })
    })
    .post(function(req, res, next) {
      lib.update(req)
        .then(function(result) {
          res.json(result)
        })
        .catch(function(err) {
          res.json({
            error: err.message
          });
        })
    })
    .put(function(req, res, next) {
      lib.create(req)
        .then(function(result) {
          res.json(result)
        })
        .catch(function(err) {
          res.json({
            error: err.message
          });
        })
    })
    .delete(function(req, res, next) {
      lib.delete(req)
        .then(function(result) {
          res.json(result)
        })
        .catch(function(err) {
          res.json({
            error: err.message
          });
        })
    })
  return {
    requirements: router
  };
}

module.exports = requirements
