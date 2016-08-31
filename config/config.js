'user strict';

const enviroment = {
  development: {
    isProduction: false,
  },
  production: {
    isProduction: true,
  },
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  apiHost: process.env.API_NODE_HOST || 'localhost',
  apiPort: process.env.API_NODE_PORT || 8080,
  clientHost:  process.env.CLIENT_NODE_HOST || 'localhost',
  clientPort: process.env.CLINET_NODE_PORT || 3000,
}, enviroment);
