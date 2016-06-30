var _ = require('lodash');

var localEnvVars = {
  TITLE:      'rnr',
  SAFE_TITLE: 'rnr',
  MLAB_URI:   process.env.MLAB_URI
};

// Merge all environmental variables into one object.
module.exports = _.extend(process.env, localEnvVars);
