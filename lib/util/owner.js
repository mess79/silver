let _ = require("lodash");

let owner = function(req, target) {
  let result = false;
  _.each(target.account, function(i) {
    if (String(req.user.subject) === String(i) && String(result.host) === req.user.host) {
      result = true;
    }
  })
  return result;
}

module.exports = owner
