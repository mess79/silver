const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const order = {
  case_number: Number,
  delivery_address: {
    line1: String,
    line2: String,
    line3: String,
    city: String,
    county: String,
    zip: String,
    country: String
  },
  delivery_method: String,
  requirements: [{
    _id: false,
    name: String,
    status: [{
      _id: false,
      date: Date,
      omitted: Boolean,
      satisfied: Boolean,
      quantity_received: Number,
      comment: String
    }]
  }],
  processes: [{
    line_item: [{
      _id: false,
      service: String,
      amount: Number,
      tax: Number
    }],
    _id: false,
    country_to: String,
    country_from: String,
    purpose: String,
    tracking: [{
      _id: false,
      status: String, // initiated, recieved, intention to lodge etc...
      date: {
        type: Date,
        required: true,
        default: Date.now
      }
    }],
  }],
  closed: Boolean,
  person: [{
    type: Schema.Types.ObjectId,
    ref: 'person'
  }],
  invoice: [{
    type: Schema.Types.ObjectId,
    ref: 'invoice'
  }],
  account: [{
    type: Schema.Types.ObjectId,
    ref: 'account'
  }],
  consultant: [{
    type: Schema.Types.ObjectId,
    ref: 'account'
  }],
  company: {
    type: Schema.Types.ObjectId,
    ref: 'company'
  },
  processing_company: {
    type: Schema.Types.ObjectId,
    ref: 'company'
  },
  host: {
    type: Schema.Types.ObjectId,
    ref: 'host'
  },
  active: {
    default: true,
    type: Boolean
  }
}

module.exports = order;
