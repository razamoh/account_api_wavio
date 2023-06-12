const adminValidation = require('./adminValidation');
const contractValidation = require('./contractValidation');
const profileValidation = require('./profileValidation');
const jobValidation = require('./jobValidation');

module.exports = {
  ...adminValidation, ...contractValidation, ...profileValidation, ...jobValidation,
};
