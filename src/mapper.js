const config = require('../config');
const request = require('request');
const csv = require('csvtojson');
const store = { mappings: [], updatedAt: null };

const loadCsvIntoMemory = () => {
  console.log('Start loading CSV into memory');
  const options = { delimiter: '|' };

  return new Promise((res, rej) => {
    csv(options)
      .fromStream(request.get(config.linkToCsv))
      .subscribe(onNewRow, csvOnError(rej), csvOnComplete(res));
  });
};

const onNewRow = row => store.mappings.push(sanitiseRow(row));

const csvOnError = callback => error => {
  console.log(error);
  callback(error);
};

const csvOnComplete = callback => () => {
  console.log(
    'Finished loading CSV into memory: ',
    store.mappings.length,
    'new entries'
  );
  store.updatedAt = new Date();
  callback();
};

const sanitiseRow = row => {
  const sanitisedRow = {
    cik: sanitiseCik(row.CIK),
    ticker: row.Ticker,
    name: row.Name,
    sic: row.SIC,
    exchange: row.Exchange,
    // business: row.Business,
    // incorporated: row.Incorporated,
    irs: row.IRS
  };

  if (store.mappings.length % 4000 === 0) {
    console.log(sanitisedRow);
  }

  return sanitisedRow;
};

const sanitiseCik = cik => {
  const paddingLength = 10 - cik.length;
  let padding = '';
  for (let i = 0; i < paddingLength; i++) {
    padding = padding + '0';
  }
  return padding + cik;
};

const findMappings = (key, value) => {
  console.log(key, value);
  const regex = RegExp(value, 'ig');
  const result = store.mappings.filter(mapping => regex.test(mapping[key]));
  console.log(result);
  return result;
};

module.exports.getByCik = ({ cik }) => {
  return findMappings('cik', cik);
};
module.exports.getByTicker = ({ ticker }) => {
  return findMappings('ticker', ticker);
};
module.exports.getByName = ({ name }) => {
  return findMappings('name', name);
};
module.exports.getByExchange = ({ exchange }) => {
  return findMappings('exchange', exchange);
};
module.exports.init = loadCsvIntoMemory;

module.exports.startUpdateScheduler = () => {
  console.log('Starting CSV Update Scheduler');
  setInterval(loadCsvIntoMemory, config.mapper.updateInterval);
};
