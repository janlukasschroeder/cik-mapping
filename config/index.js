module.exports = {
  express: {
    port: process.env.PORT || 3000
  },
  linkToCsv: 'http://rankandfiled.com/static/export/cik_ticker.csv',
  heroku: {
    dynoUrl: process.env.DYNO_URL || 'https://mapping-api.herokuapp.com/ping',
    pingInterval: 60000 // 60 seconds
  },
  mapper: {
    updateInterval: 60 * 1000 * 60 * 12 // 12 hours
  }
};
