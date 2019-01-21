const db = require("./connection");
const personObject = require("./objects/personObject");
const countryMap = require('./objects/country/map')
const _ = require("lodash");

const countryList = Object.keys(countryMap);

let schemas = {
  all: new db.Schema(personObject())
}

_.each(countryList, function(a) {
  let obj = {}
  obj[a] = new db.Schema(personObject(a));
  schemas = _.assignIn(schemas, obj)
})

const schemaList = Object.keys(schemas);
let person = {}

_.each(schemaList, function(b) {
  let obj = {}
  obj[b] = db.model(b, schemas[b], "person")
  person = _.assignIn(person, obj)
})
module.exports = person;
