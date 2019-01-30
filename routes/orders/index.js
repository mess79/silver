//const path = require("path");

const orders = function(express) {
  const router = express.Router();

  const search = function(search_id, user_id){
    return new Promise((resolve, reject) => {
      console.log()
    })
  }

  router.route("/orders/:id")
    .get(function(req, res, next) {
      console.log(req.user.subject);
      res.send("")
    })
    .post(function(req, res, next) {

    })
    .put(function(req, res, next) {

    })
    .delete(function(req, res, next) {

    })
  return {
    orders: router
  };
}

module.exports = orders
