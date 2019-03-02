let _ = require("lodash");

let owner = function(req, target) {
  console.log(req.user)
  console.log(target.account)
  console.log(target.host)
  let result = false;
  _.each(target.account, function(i) {
    if (String(req.user.subject) === String(i) && String(target.host) === req.user.host) {
      result = true;
    }
  })
  return result;
}

module.exports = owner
