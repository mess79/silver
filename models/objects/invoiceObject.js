const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invoice = {
  invoice_number : Number,
  address : {
    line1: String,
    line2 : String,
    line3 : String,
    city : String,
    county : String,
    zip : String,
    country : String
  },
  line_item : [{
    service : String,
    quantity : Number,
    amount : Number,
    tax : Number
  }],
  contact : [{ type: Schema.Types.ObjectId, ref: 'account' }],
  person : [{ type: Schema.Types.ObjectId, ref: 'person' }]
}

module.exports = invoice;
