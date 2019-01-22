const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const account = {
  username: String,
  password: {
    salt: String,
    hash: String
  },
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
  invoices: [{ type: Schema.Types.ObjectId, ref: 'invoice' }],
  permissions: {
    case : ["c", "r", "u", "d"],
    person_country : ["c", "r", "u", "d"],
    account : ["c", "r", "u", "d"],
    invoice : ["c", "r", "u", "d"],
    company : ["c", "r", "u", "d"]
  }
}

module.exports = account;
