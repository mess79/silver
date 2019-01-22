//const mongoose = require('mongoose');
//const Schema = mongoose.Schema;

const requirements = {
  country_from: String,
  country_to : String,
  purpose: String,
  requirement: [{
    _id: false,
    name: String,
    link: String,
    quantity: Number,
    icon: String,
    description : String
  }]
}

module.exports = requirements;
