const path = require("path");
const fs = require("fs");
const send = require('../../lib/util/send')

const pages = function(express) {

  const router = express.Router();
  const fileDirectory = path.resolve(__dirname, '../../dist/');
  const pugFileDirectory = path.resolve(__dirname, '../../views/');
  router.route(['/', '/:path'])
    .all(function(req, res, next) {
      if (!req.params.path) {
        req.params.path = "index";
      }
      let path = req.params.path;
      let pathSplit = path.split(".")

      // send only urls with no extention (so no assets)

      //console.log("pages");
      //console.log(req.user);
      //res.type(path);

      if (pathSplit.length === 1) {
        send(req, res, next, {
          message: false,
          data: false,
          url: path
        })
      } else {

// assets return
console.log(path);
        res.sendFile(path, {
          root: fileDirectory
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
