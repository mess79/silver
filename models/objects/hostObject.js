const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const host = {

  name : String,
  active : false,
  domain: String,
  address : [{
    _id: false,
    line1: String,
    line2 : String,
    line3 : String,
    city : String,
    county : String,
    zip : String,
    country : String
  }],
  host : String,
  email : String
}

module.exports = host;
