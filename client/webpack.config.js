const path = require('path');

module.exports = {
  // ... Autres configurations Webpack ...
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify"),
    },
  },
};
