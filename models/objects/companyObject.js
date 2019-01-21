const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const company = {

  name : String,
  address : [{
    line1: String,
    line2 : String,
    line3 : String,
    city : String,
    county : String,
    zip : String,
    country : String
  }],
  contact : [{ type: Schema.Types.ObjectId, ref: 'account' }]
}

module.exports = company;
