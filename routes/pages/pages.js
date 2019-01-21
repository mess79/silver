const path = require("path");
const pages = function(express) {
  const router = express.Router();
  const fileDirectory = path.resolve(__dirname, '../../dist/');
  router.route(['/', '/:path'])
    .all(function(req, res, next) {
      if(!req.params.path){
        req.params.path = "index";
      }
      res.sendFile(req.params.path + '.html', {root: fileDirectory}, (err) => {
        if (err) {
          next(err)
        };
      });
    })
  return router;
}

module.exports = pages;
