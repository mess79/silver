const db = require("./connection");
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const orderSchema = new db.Schema(require("./objects/orderObject"));
orderSchema.plugin(AutoIncrement, {inc_field: 'order_number'});
const order = db.model("order", orderSchema , "order")

module.exports = order;
