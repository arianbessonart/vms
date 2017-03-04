var express = require('express');
var router = express.Router();

var clients = require('./client');
var invoices = require('./invoice');

router.use(function (req, res, next) {
  res.header("Content-Type", "application/json");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});

router.use('/v1/clients', clients);
router.use('/v1/invoices', invoices);

module.exports = router;
