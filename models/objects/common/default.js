const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const owner = {
  host: {
    type: Schema.Types.ObjectId,
    ref: 'host'
  },
  account: [{
    type: Schema.Types.ObjectId,
    ref: 'account'
  }],
  active: Boolean
}

module.exports = owner
