const express = require('express');
const moment = require('moment');
const router = express.Router();
const Invoice = require('../model/invoice.model');

function find(req, res) {
  Invoice.find({})
    .populate('client')
    .sort('-date')
    .exec((err, invoices) => {
      const response = {};
      for (const i of invoices) {
        const momentDate = moment(i.date);
        const year = momentDate.year();
        const month = momentDate.month();
        if (!response[year]) {
          response[year] = {};
        }
        if (!response[year][month]) {
          response[year][month] = { total: 0 };
        }
        response[year][month].total += i.total;
      }
      if (!err) {
        res.status(200).send(response);
      }
    });
}

router.get('/', find);

module.exports = router;
