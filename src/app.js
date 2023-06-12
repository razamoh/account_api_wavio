/* eslint-disable import/no-unresolved */
// app.js

const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
require('module-alias/register');
const bodyParser = require('body-parser');
const models = require('@models');
const { errorHandler } = require('@utils/errorHandler');
const { getProfile } = require('./middleware/getProfile');

const app = express();

app.use(bodyParser.json());
app.set('sequelize', models.sequelize);
app.set('models', models);

// API routes
const v1Router = require('./routes/v1');

app.use('/api/v1', getProfile, v1Router);
app.use(errorHandler);

app.all('*', (req, res) => {
  res.send({ error: 'This route does not exists!.: Incase if you are using api versioning.make sure you are using correct version ex: api/v1/<your route>' }, 404);
});
module.exports = app;
