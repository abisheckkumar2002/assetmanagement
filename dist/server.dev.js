"use strict";

var express = require('express');

var cors = require('cors');

var path = require('path');

var bodyParser = require('body-parser');

var methodOverride = require('method-override'); //routers


var userRouter = require('./router/user.js');

var assetCategory = require('./router/assetCategory.js');

var asset = require('./router/asset.js');

var assetStatus = require('./router/assetStatus.js');

var repair = require('./router/repair');

var app = express();
var port = 3005; // CORS configuration

app.use(cors()); // Enable CORS for all routes
// Middleware for parsing application/json

app.use(bodyParser.json({
  limit: '10mb'
}));
app.use(express.urlencoded({
  extended: true
}));
app.use(methodOverride('_method')); //set pug engiee

app.use(express["static"](path.join(__dirname, 'public')));
app.set('views', './public');
app.set('view engine', 'pug'); // Link the user router for routes like /users

app.use('/users', userRouter);
app.use('/assetcategory', assetCategory);
app.use('/asset', asset);
app.use('/assetStatus', assetStatus);
app.use('/repair', repair);
app.get('/', function (req, res) {
  res.status(200).render('view/user/index.pug');
});
app.listen(port, function () {
  console.log("Server running on http://localhost:".concat(port));
});