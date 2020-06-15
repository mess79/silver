const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requirements = {
  country_from: String,
  country_to: String,
  category: [{
    _id: false,
    purpose: String,
    requirement: [{
      origin : [{ type: Schema.Types.ObjectId, ref: 'requirement_item' }],
      _id: false,
      //name: String,
      link: String,
      quantity: Number,
      //icon: String,
      //description: String,
      //variable: [],
      variableInput: {},
      nationality: {
        exclude : Boolean,
        countryCodes: []
      }
    }]
  }],
  active: {
    default: true,
    type: Boolean
  }
}

module.exports = requirements;
