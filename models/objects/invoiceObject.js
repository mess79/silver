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
    }],
    country_from: String,
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
  fee_total: Number,
  transaction: [{
    payment_type: String,
    Reference: String,
    amount: Number
  }],
  paid: Boolean,
  closed: Boolean,
  credit: Boolean,
  account: [{
    type: Schema.Types.ObjectId,
    ref: 'account'
  }],
  host: {
    type: Schema.Types.ObjectId,
    ref: 'host'
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'company'
  },
  processing_company: {
    type: Schema.Types.ObjectId,
    ref: 'company'
  },
  order: {
    type: Schema.Types.ObjectId,
    ref: 'order'
  },
  consultant: [{
    type: Schema.Types.ObjectId,
    ref: 'account'
  }]
}

module.exports = invoice;
