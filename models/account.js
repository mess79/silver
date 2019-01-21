const db = require("./connection");
const accountSchema = new db.Schema(require("./objects/accountObject"));
const account = db.model("account", accountSchema , "account")

module.exports = account;
