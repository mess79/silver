const path = require("path");
const fileDirectory = path.resolve(__dirname, '../../dist/');

/*json = {
message: String,
data: data
url: url
}*/

const send = function(req, res, next, json) {
  if (req.xhr) {
    res.json({
      message: json.message,
      data: json.data
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
}
module.exports = send;
