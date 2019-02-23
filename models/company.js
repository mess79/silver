const db = require("./connection");
const companySchema = new db.Schema(require("./objects/companyObject"));
const company = db.model("company", companySchema , "company")

module.exports = company;
