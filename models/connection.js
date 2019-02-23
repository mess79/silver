const mongoose = require('mongoose');
const url = process.env.MONGO || "'mongodb://root:vegetable@127.0.0.1:27017/autoFiller";
const options = { useNewUrlParser: true };
mongoose.set('useFindAndModify', false);

mongoose.connect(url, options).then(
  () => {
    console.log("logged into db");
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
  },
  err => {
    console.log(err)
  }
);

module.exports = mongoose;
