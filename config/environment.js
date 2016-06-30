var _ = require('lodash');

var localEnvVars = {
  TITLE:      'rnr',
  SAFE_TITLE: 'rnr'
};

// Merge all environmental variables into one object.
module.exports = _.extend(process.env, localEnvVars);
