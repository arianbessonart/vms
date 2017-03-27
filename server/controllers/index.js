const express = require('express');
const router = express.Router();

const clients = require('./client');
const invoices = require('./invoice');
const auth = require('./auth');
const reports = require('./report');

router.use((req, res, next) => {
  res.header('Content-Type', 'application/json');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // intercept OPTIONS method
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

router.use('/v1/auth', auth);
router.use('/v1/clients', clients);
router.use('/v1/invoices', invoices);
router.use('/v1/reports', reports);

module.exports = router;
