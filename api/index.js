
const express = require('express');
const bodyParser = require('body-parser');
const serverConfig = require('./config');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const api = require('./controllers');
const app = express();

// MongoDB Connection
mongoose.connect(serverConfig.dbUrl, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(serverConfig.port);
app.use('/api', api);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // intercept OPTIONS method
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    req.limit = parseInt(req.query.limit || 10);
    req.page = parseInt(req.query.page || 1);
    req.q = req.query.q || false;
    delete req.query.limit;
    delete req.query.page;
    delete req.query.q;
    next();
  }
});
