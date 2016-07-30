require('babel-core/register');

require.extensions['.css'] = () => {
  return;
};

global.__CLIENT__ = false;

require('./server.js');
