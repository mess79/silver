const db = require("./connection");
const mongoose = require('mongoose');
const requirementSchema = new db.Schema(require("./objects/requirementsObject"));
const requirements = db.model("requirements", requirementSchema , "requirements")

module.exports = requirements;
