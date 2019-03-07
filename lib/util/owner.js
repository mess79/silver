let _ = require("lodash");

let owner = function(req, target) {
  /*console.log(req.user)
  console.log(target.account)
  console.log(target.host)*/
  let result = false;

  //check if the document is owned by the person logged in and the domain they are logged into.
  _.each(target.account, function(i) {
    if (String(req.user.subject) === String(i) && String(target.host) === req.user.host) {
      result = true;
    }
  })

  //check if the role of the person allows them to access
  /*
  switch (req.user.role) {
    case "client":
      // no access to another changes unless explicitly passes the ownership tests above
      break;
    case "consultant":
      if (String(target.host) === req.user.host && String(target.processing_company === req.user.processing_company)) {
        result = true;
      }
      break;
    case "manager":
      if (String(target.host) === req.user.host) {
        result = true;
      }
      break;
    case "company_admin":
      if (String(target.host) === req.user.host) {
        result = true;
      }
      break;
    case "server_admin":
      break;
    case "superuser":
      result = true
      break;
  */

  return result;
}

module.exports = owner