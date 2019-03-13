const _ = require("lodash");
const fs = require('fs');
class cssLinks {
  apply(compiler) {
    compiler.hooks.done.tap('cssLinksPlugin', (
      stats
    ) => {
      const entry = Object.keys(stats.compilation.options.entry);
      const list = Object.keys(stats.compilation.assets);
      let query = '^css/';
      let regexTest = new RegExp(query, 'i');
      _.each(entry, function(a) {
        let entryQuery = a + "."
        let regexEntryTest = new RegExp(entryQuery, "i");
        let arr = [];
        _.each(list, function(i) {
          if (regexTest.test(i) && regexEntryTest.test(i)) {
            arr.push(i);
          }
        })
        let output = ""
        _.each(arr, function(src) {
          output = output + "link(href='" + src + "', rel='stylesheet', type='text/css')\n"
        })
        let path = "./dist/links/" + a + ".pug";
        if (!fs.existsSync("./dist/links")) {
          fs.mkdirSync("./dist/links");
        }
        fs.writeFile(path, output, function(err) {
          if (err) {
            return console.log(err);
          }
        });
      })
    });
  }
}

module.exports = cssLinks;
