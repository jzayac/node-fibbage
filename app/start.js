require('babel-core/register');

require.extensions['.css'] = () => {
  return;
};

require('./server.js');
