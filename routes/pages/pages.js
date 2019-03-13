const path = require("path");
const fs = require("fs");
const send = require('../../lib/util/send')

const pages = function(express) {

  const router = express.Router();
  const fileDirectory = path.resolve(__dirname, '../../dist/');
  const pugFileDirectory = path.resolve(__dirname, '../../views/');
  const assetDirectory = path.resolve(__dirname, '../../host_assets/');

  router.route(['/', '/:path'])
    .all(function(req, res, next) {
      if (!req.params.path) {
        req.params.path = "index";
      }
      let path = req.params.path;
      let pathSplit = path.split(".")

      // send only urls with no extention (so no assets)
      if (pathSplit.length === 1) {
        send(req, res, next, {
          message: false,
          data: false,
          url: path
        })
      } else {

        // assets return
        res.sendFile(req.headers.host + "/" + path, {
          root: assetDirectory
        }, (err) => {
          if (err) {
            next(err)
          };
        });
      }
    })
  return router;
}

module.exports = pages;
