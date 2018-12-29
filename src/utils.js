const request = require('request');
const config = require('../config');

const ping = url => {
  request.get(url, (err, response, body) => {
    if (!err && response.statusCode === 200) {
      console.log(url, 'alive');
      return -1;
    }
    console.log(url, 'dead');
  });
};

module.exports.keepDynoAlive = () => {
  console.log('Starting keepDynoAlive');
  setInterval(() => ping(config.heroku.dynoUrl), config.heroku.pingInterval);
};
