const express = require('express');
const moment = require('moment');
const _ = require('lodash');
const router = express.Router();
const Invoice = require('../model/invoice.model');

function byMonth(req, res) {
  Invoice.find({})
    .populate('client')
    .sort('-date')
    .exec((err, invoices) => {
      const response = [];
      const reportByMonth = {};
      for (const i of invoices) {
        const momentDate = moment(i.date);
        const year = momentDate.year();
        const month = momentDate.month();
        if (!reportByMonth[month]) {
          reportByMonth[month] = {};
        }
        if (!reportByMonth[month][year]) {
          reportByMonth[month][year] = 0;
        }
        reportByMonth[month][year] += i.total;
      }
      for (const key in reportByMonth) {
        const item = _.merge({ month: moment.months(Number(key)) }, reportByMonth[key]);
        response.push(item);
      }
      if (!err) {
        res.status(200).send(response);
      }
    });
}

router.get('/byMonth', byMonth);

module.exports = router;
