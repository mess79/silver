let _ = require("lodash");

let owner = function(req, target, accountBypass) {
  let result = false;

  //check if the document is owned by the person logged in and the domain they are logged into.

  if (target) {
    if (accountBypass) {
      if (String(req.user.subject) === String(target._id) && String(target.host) === req.user.host) {
        result = true;
      }
    } else {
      _.each(target.account, function(i) {
        if (String(req.user.subject) === String(i) && String(target.host) === req.user.host) {
          result = true;
        }
      })
    }
    //check if the role of the person allows them to access
    if (!req.user) {
      req.user = {
        role: "client"
      };
    }
    switch (req.user.role) {
      case "client":
        // no access to another changes unless explicitly passes the ownership tests above
        break;
      case "client_manager":
        if (String(target.host) === req.user.host && String(target.company === req.user.company)) {
          result = true;
        }
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
        result = true
        break;
      case "superuser":
        result = true
        break;
    }
  }
  return result;
}

module.exports = owner
