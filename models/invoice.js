const db = require("./connection");
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const invoiceSchema = new db.Schema(require("./objects/invoiceObject"));
invoiceSchema.plugin(AutoIncrement, {inc_field: 'invoice_number'});
const invoice = db.model("invoice", invoiceSchema , "invoice")

module.exports = invoice;
