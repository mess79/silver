const routes = function(express) {
  const router = express.Router();
  const lib = require("../../lib");
  const path = require("../lib/params");

  router.route(['/person_country', "/person_country/:options/*"])
    .all(function(req, res, next) {
      req = path(req);
      next();
    })
    .patch(function(req, res, next) {
      console.log("PATCH responded to");
      res.send("patch reponse");
    })
    .get(function(req, res, next) {
      lib.retrieve(req)
        .then(function(result) {
          console.log("GET responded to");
          res.json(result);
        })
        .catch(function(err){
          console.log(err)
          res.json({error: err.message});
        })
    })
    .put(function(req, res, next) {
      lib.create(req)
        .then(function(result) {
          console.log("PUT responded to");
          res.json(result);
        })
        .catch(function(err){
          console.log(err)
          res.json({error: err.message});
        })
    })
    .post(function(req, res, next) {
      lib.update(req)
        .then(function(result) {
          console.log("POST responded to");
          res.json(result);
        })
        .catch(function(err){
          console.log(err)
          res.json({error: err.message});
        })
    })
    .delete(function(req, res, next) {
      lib.delete(req)
        .then(function(result) {
          console.log("DELETE responded to");
          res.json(result);
        })
        .catch(function(err){
          console.log(err)
          res.json({error: err.message});
        })
    });
  return {api: router};
}

module.exports = routes
