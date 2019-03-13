const path = require("path");

const js = function(express) {
  const router = express.Router();

  router.route("/js/:path")
    .get(function(req, res, next) {
      const fileDirectory = path.resolve(__dirname, '../../dist/js/');
      res.sendFile(req.params.path, {
        root: fileDirectory
      }, (err) => {
        if (err) {
          next(err)
        };
      });
    })
  return router
}

module.exports = js
