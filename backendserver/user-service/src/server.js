const express = require('express');
const { PORT } = require('./config');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const { databaseConnection } = require('./database');
const expressApp = require('./express-app');

var env = process.env.NODE_ENV || 'development';
var config = require('./config')[env];


const StartServer = async() => {
  const app = express();

  app.use(bodyParser.json());
  await databaseConnection();

  await expressApp(app);

  app.listen(3001, () => {
    console.log(`listening on port 3001`);
  })
  .on('error', (err) => {
    console.log(err);
    process.exit();
  })
  .on('close', () => {
    channel.close();
  })
}

StartServer();
