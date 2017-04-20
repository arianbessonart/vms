
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

app.use('/api', api);

app.listen(serverConfig.port);
