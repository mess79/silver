//const mongoose = require('mongoose');
//const Schema = mongoose.Schema;

const requirements = {
  country_from: String,
  country_to : String,
  requirement: [{
    _id: false,
    name: String,
    description : String
  }]
}

module.exports = requirements;
