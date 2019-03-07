const path = require("path");
const fileDirectory = path.resolve(__dirname, '../../dist/');
const pugFileDirectory = path.resolve(__dirname, '../../views/');
const render_data = require("./render_data");
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
            let options = {
              user: req.user
            };
            //console.log(req.user)
            render_data(req)
              .then(function(values) {
                options.host = values[0]
                options.account = values[1]
                options.company = values[2]
                options.processing_company = values[3]
                res.render(json.url + ".pug", options)
              })
              .catch(function(err){
                next(err);
              })

          }
        })
      } else {
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
