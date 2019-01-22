const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invoice = {
  invoice_number: Number,
  address: {
    line1: String,
    line2: String,
    line3: String,
    city: String,
    county: String,
    zip: String,
    country: String
  },
  description: [{
    _id: false,
    person: [{
      type: Schema.Types.ObjectId,
      ref: 'person'
    }]
    country_from String,
    country_to: String,
    service: String
  }],
  line_item: [{
    _id: false,
    service: String,
    quantity: Number,
    amount: Number,
    tax: Number
  }],
  paid: Boolean,
  closed: Boolean,
  credit: Boolean,
  contact: [{
    type: Schema.Types.ObjectId,
    ref: 'account'
  }]
}

module.exports = invoice;
