const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const account = {
  active: {
    Type: Boolean,
    default : false
  },
  activation: {
    hash: String,
    exp: Date
  },
  reset: {
    hash: String,
    exp : Date
  },
  username: String,
  password: {
    salt: String,
    hash: String
  },
  csrf_hash: String, 
  first_name: String,
  surname: String,
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
  company : [{ type: Schema.Types.ObjectId, ref: 'company' }],
  people : [{ type: Schema.Types.ObjectId, ref: 'person' }],
  order: [{ type: Schema.Types.ObjectId, ref: 'order' }],
  invoice: [{ type: Schema.Types.ObjectId, ref: 'invoice' }],
  role: String,
  /*permissions: {
    case : ["c", "r", "u", "d"],
    person_country : ["c", "r", "u", "d"],
    account : ["c", "r", "u", "d"],
    invoice : ["c", "r", "u", "d"],
    company : ["c", "r", "u", "d"]
  }*/
}

module.exports = account;
