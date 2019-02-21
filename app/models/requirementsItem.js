const db = require("./connection");
const mongoose = require('mongoose');
const requirementItemSchema = new db.Schema(require("./objects/requirementsItemObject"));
const requirementsItem = db.model("requirementsItem", requirementItemSchema , "requirementsItem")

module.exports = requirementsItem;
