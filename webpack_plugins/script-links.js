const _ = require("lodash");
const fs = require('fs');
class scriptLinks {
  apply(compiler) {
    compiler.hooks.done.tap('scriptLinksPlugin', (
      stats
    ) => {
      const entry = Object.keys(stats.compilation.options.entry);
      const list = Object.keys(stats.compilation.assets);
      let query = '^js/';
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
          output = output + "script(src='" + src + "')\n"
        })
        let path = "./dist/scripts/" + a + ".pug";
        if (!fs.existsSync("./dist/scripts")) {
          fs.mkdirSync("./dist/scripts");
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

module.exports = scriptLinks;
