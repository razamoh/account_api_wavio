/* eslint-disable import/no-unresolved */
// app.js

const express = require('express');
const helmet = require('helmet');

// eslint-disable-next-line import/no-extraneous-dependencies
require('module-alias/register');
const bodyParser = require('body-parser');
const models = require('@models');
const errorHandlerUtils = require('@utils/errorHandler');
const { getProfile } = require('./middleware/getProfile');

const app = express();
const { errorHandler } = errorHandlerUtils;
app.use(bodyParser.json());
app.use(helmet());
app.set('sequelize', models.sequelize);
app.set('models', models);
app.set('error', errorHandlerUtils);

// API routes
const v1Router = require('./routes/v1');
const v2Router = require('./routes/v2');

app.use('/api/v1', getProfile, v1Router);
app.use('/api/v2', getProfile, v2Router);
app.use(errorHandler);

app.all('*', (req, res) => {
  res.status(404).send({ error: 'This route does not exists!.: Incase if you are using api versioning.make sure you are using correct version ex: api/v1/<your route>' });
});

module.exports = app;
