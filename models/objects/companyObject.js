const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const company = {

  name: String,
  link: String,
  domain: String,
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
  contact: [{
    type: Schema.Types.ObjectId,
    ref: 'account'
  }],
  host: {
    type: Schema.Types.ObjectId,
    ref: 'host'
  }
}

module.exports = company;
