//const path = require("path");

const lib = require("../../lib/order");

const orders = function(express) {
  const router = express.Router();

  router.route("/order/:id")
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
    orders: router
  };
}

module.exports = orders
