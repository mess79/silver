//constants
if (!process.env.NODE_ENV){
  process.env.NODE_ENV = "development"
}


const express = require('express')
const app = express()
const port = process.env.PORT || 8080;
const cookieParser = require("cookie-parser")
const routes = require("./routes")(express, app);
const path = require("path");

//setters and users
app.set('views', './views')
app.set('view engine', 'pug')
app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser());

/*
app.get(['/env'], function(req, res){
  let out = {
    NODE_ENV: process.env.NODE_ENV,
    OPENSHIFT: process.env.OPENSHIFT,
    PORT: port,
    KEYS_PUBLIC:process.env.KEYS_PUBLIC,
    KEYS_PRIVATE:process.env.KEYS_PRIVATE
  }

  res.json(out);
})
*/
app.get(['/test'], function(req, res) {
  res.render('test')
})


routes();



app.listen(port, () => console.log(`App listening on port ${port}!`));



/*
const requirements = require("./models/requirements");
requirements.create({
  country_from: "GBR",
  country_to: "CHN",
  category: [{
    purpose: "Business",
    requirement: [{
      origin : ["5c52025cfba160407062c19f"],
      name: "Passport",
      link: false,
      quantity: 1,
      icon: false,
      description: "#pages pages spare and #validityMonths months left after travel",
      variable: ["pages", "validityMonths"],
      variableInput: {
        pages : 2,
        validityMonths: 6
      },
      nationality: {
        exclude : true,
        countryCodes: ["ESP", "ITA"]
      }
    },
    {
      origin : ["5c515ecc6d0c353dba975830"],
      name: "Passport",
      link: false,
      quantity: 1,
      icon: false,
      description: "#pages pages spare and #validityMonths months left after travel",
      variable: ["pages", "validityMonths"],
      variableInput: {
        pages : 1,
        validityMonths: 3
      },
      nationality: {
        exclude : false,
        countryCodes: ["ESP", "ITA"]
      }
    }]
  },
  {
    purpose: "Tourist",
    requirement: [{
      origin : ["5c52025cfba160407062c19f"],
      name: "Passport",
      link: false,
      quantity: 1,
      icon: false,
      description: "#pages pages spare and #validityMonths months left after travel",
      variable: ["pages", "validityMonths"],
      variableInput: {
        pages : 2,
        validityMonths: 6
      },
      nationality: {
        exclude : true,
        countryCodes: ["ESP", "ITA"]
      }
    },
    {
      origin : ["5c515ecc6d0c353dba975830"],
      name: "Passport",
      link: false,
      quantity: 1,
      icon: false,
      description: "#pages pages spare and #validityMonths months left after travel",
      variable: ["pages", "validityMonths"],
      variableInput: {
        pages : 1,
        validityMonths: 3
      },
      nationality: {
        exclude : false,
        countryCodes: ["ESP", "ITA"]
      }
    }]
  }]
  },

  function(err, small) {
    if (err) {
      console.log(err)
    } else {
      console.log(small);
    }
  })
*/
/*
const requirementsItem = require("./models/requirementsItem");
requirementsItem.create({
    name: "Passport",
    link: false,
    quantity: 1,
    icon: false,
    description: "#pages pages spare and #validityMonths months left after travel",
    variable: ["pages", "validityMonths"]
  },

  function(err, small) {
    if (err) {
      console.log(err)
    } else {
      console.log(small);
    }
  })
*/

/*
const order = require("./models/order");
order.create({
delivery_address : {
  line1: "1 test road",
  line2 : "test add line 2",
  line3 : "test add third line",
  city : "test city",
  county : "test county",
  zip : "TEST21",
  country : "UNITED TEST COUNTRY"
},
requirements: [{
  name: "passport" ,
  quantity_recieved: 1,
  status: [{
    omitted : false,
    recieved : false,
    comment : "awaiting docs"
  }]
}],
tracking : [{
  date : Date.now(),
  status: "initiated" // initiated, recieved, intention to lodge etc...
}],
closed: false,
account : ["5c3ee21e8910d4572a56d613"],
person : ["5c327a5589ecdd4af7821c6a"],
invoice : ["5c46278502423150314ad57b"]
}, function (err, small) {
  if (err) {console.log(err)} else {
    console.log(small);
  }
  // saved!
});
*/
/*
const invoice = require("./models/invoice");
invoice.create({
  address : {
    line1: "1 test road",
    line2 : "test add line 2",
    line3 : "test add third line",
    city : "test city",
    county : "test county",
    zip : "TEST21",
    country : "UNITED TEST COUNTRY"
  },
  line_item : [{
    service : "test service",
    quantity : 2,
    amount : 50,
    tax : 0.2
  },{
    service : "test service 2",
    quantity : 4,
    amount : 25,
    tax : 0
  }],
  contact : ["5c3ee21e8910d4572a56d613"],
  person : ["5c327a5589ecdd4af7821c6a"]
}, function (err, small) {
  if (err) {console.log(handleError(err))} else {
    console.log(small);
  }
  // saved!
});
*/
/*
const company = require("./models/company");
company.create({
  name : "test company",
  address : [{
    line1: "1 test road",
    line2 : "test add line 2",
    line3 : "test add third line",
    city : "test city",
    county : "test county",
    zip : "TEST21",
    country : "UNITED TEST COUNTRY"
  }],
  contact : "5c3ee21e8910d4572a56d613"
}, function (err, small) {
  if (err) {console.log(handleError(err))} else {
    console.log(small);
  }
  // saved!
});
*/
/*
const host = require("./models/host");
host.create({
  name : "default",
  active : true,
  domain: "localhost:8080",
  address : [{
    line1: "1 default host road",
    line2 : "test add line 2",
    line3 : "test add third line",
    city : "test city",
    county : "test county",
    zip : "TEST21",
    country : "UNITED TEST HOST COUNTRY"
  }],
  host : "5ec849011ac58b247bb34526",
  email : "madeup@host.com"
}, function (err, small) {
  if (err) {console.log(handleError(err))} else {
    console.log(small);
  }
  // saved!
});
*/
