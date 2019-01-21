//constants
const express = require('express')
const app = express()
const port = 3000
const cookieParser = require("cookie-parser")
const routes = require("./routes")(express, app);
const path = require("path");
//const errors = require("./routes/errors")(app);

//setters and users
app.set('views', './views')
app.set('view engine', 'pug')
app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());

routes();

app.get(['/test'], function (req, res) {
  res.render('test')
})


app.listen(port, () => console.log(`App listening on port ${port}!`))
