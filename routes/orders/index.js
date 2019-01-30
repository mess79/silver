//const path = require("path");

const orders = function(express) {
  const router = express.Router();

  const search = function(req) {
    return new Promise((resolve, reject) => {
      console.log(req.params.id + " " + req.user.subject)
      if (req.params.id === req.user.subject) {
        resolve(true)
      } else {
        resolve(false)
      }
    })
  }

  router.route("/order/:id")
    .get(function(req, res, next) {
      console.log(req.user.subject);

      search(req)
      .then(function(result) {
        console.log("GET responded to");
        res.json({auth: result});
      })
      .catch(function(err){
        console.log(err)
        res.json({error: err.message});
      })

      //res.send("")
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
