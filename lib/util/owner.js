let _ = require("lodash");

let owner = function(req, target) {
  //console.log(req.user.subject);
  let result = false;
  _.each(target, function(i) {
    console.log(i);
    if (String(req.user.subject) === String(i)) {
      result = true;
    }
  })
  //if (req.body.host !== req.user.host) {
    //result = false;
  //}
  return result;
}

module.exports = owner
