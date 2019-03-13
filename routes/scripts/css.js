const path = require("path");

const css = function(express) {
  const router = express.Router();

  router.route("/css/:path")
    .get(function(req, res, next) {
      const fileDirectory = path.resolve(__dirname, '../../dist/css/');
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

module.exports = css
