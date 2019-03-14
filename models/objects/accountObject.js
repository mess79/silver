const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const account = {
  active: {
    Type: Boolean,
    default: false
  },
  activation: {
    hash: String,
    exp: Date
  },
  reset: {
    hash: String,
    exp: Date
  },
  username: String,
  password: {
    salt: String,
    hash: String
  },
  csrf_hash: String,
  first_name: String,
  surname: String,
  address: [{
    _id: false,
    line1: String,
    line2: String,
    line3: String,
    city: String,
    county: String,
    zip: String,
    country: String
  }],
  company: {
    type: Schema.Types.ObjectId,
    ref: 'company'
  },
  processing_company: {
    type: Schema.Types.ObjectId,
    ref: 'company'
  },
  people: [{
    type: Schema.Types.ObjectId,
    ref: 'person'
  }],
  order: [{
    type: Schema.Types.ObjectId,
    ref: 'order'
  }],
  invoice: [{
    type: Schema.Types.ObjectId,
    ref: 'invoice'
  }],
  host: {
    type: Schema.Types.ObjectId,
    ref: 'host'
  },
  role: String,
}

module.exports = account;
