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

app.get('*', (req, res) => {
  res.send('This route does not exists!.: Incase if you are Use api versioning. ex: api/v1/<your route>', 404);
});
module.exports = app;
