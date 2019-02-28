const db = require("./connection");
const hostSchema = new db.Schema(require("./objects/hostObject"));
const host = db.model("host", hostSchema , "host")

module.exports = host;
