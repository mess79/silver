const path = require("path");
const fileDirectory = path.resolve(__dirname, '../../dist/');
const pugFileDirectory = path.resolve(__dirname, '../../views/');
const fs = require("fs");

/*json = {
message: String,
data: data
url: url
}*/

const send = function(req, res, next, json) {
  if (req.xhr || json.json) {
    res.json({
      message: json.message,
      data: json.data
    })
  } else {

    fs.access(fileDirectory + "/" + json.url + ".html", fs.F_OK, (err) => {
      if (err) {
        // check for .pug file instead
        fs.access(pugFileDirectory + "/" + json.url + ".pug", fs.F_OK, (err) => {
          if (err) {
            next(err)
          } else {
            console.log("pug")
            let options = {};
            res.render(json.url + ".pug", options)
          }
        })
      } else {
        console.log("html")
        res.sendFile(json.url + ".html", {
          root: fileDirectory
        }, (err) => {
          if (err) {
            next(err)
          };
        });
      }
    })
  }
}
module.exports = send;
