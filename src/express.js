const app = require('express')();
const http = require('http').createServer(app);
const config = require('../config');
const mapper = require('./mapper');
const utils = require('./utils');

app.get('/', (req, res) => {
  res.json({
    endpoints: [
      { GET: '/cik/:cik' },
      { GET: '/name/:name' },
      { GET: '/ticker/:ticker' }
    ]
  });
});

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

app.get('/exchange/:exchange', (req, res) => {
  const result = mapper.getByExchange(req.params);
  res.json(result);
});

app.get('/ping', (req, res) => {
  res.json({ pong: true });
});

const start = () => {
  mapper.init().then(() => {
    http.listen(config.express.port, () => {
      console.log(`Server listening on *:${config.express.port}`);
      utils.keepDynoAlive();
      mapper.startUpdateScheduler();
    });
  });
};

module.exports = {
  start
};
