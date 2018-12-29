const app = require('express')();
const http = require('http').createServer(app);
const config = require('../config');
const mapper = require('./mapper');

app.get('/cik/:cik', (req, res) => {
  const result = mapper.getByCik(req.params);
  res.json(result);
});

app.get('/ticker/:ticker', (req, res) => {
  const result = mapper.getByTicker(req.params);
  res.json(result);
});

app.get('/name/:name', (req, res) => {
  const result = mapper.getByName(req.params);
  res.json(result);
});

const start = () => {
  mapper.init().then(() => {
    http.listen(config.express.port, () => {
      console.log(`Server listening on *:${config.express.port}`);
      // h.keepWorkerAlive('https://sec-edgar-scanner-client.herokuapp.com');
    });
  });
};

module.exports = {
  start
};
