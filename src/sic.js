const Xray = require('x-ray');
const config = require('../config');
const x = Xray();
const store = { mappings: {}, updatedAt: null };

const saveToMemory = data => {
  data.forEach(mapping => {
    store.mappings[mapping.sic] = mapping.industryTitle;
  });
  store.updatedAt = new Date();
};

module.exports.downloadSicMappings = () => {
  return x(config.mapper.sicMappingsUrl, 'table:nth-of-type(2) table tr', [
    {
      sic: x('td'),
      industryTitle: x('td:nth-of-type(4)')
    }
  ]).then(result => console.log(result));
};

const loadSicMappingIntoMemory = async () => {
  console.log('Start loading SIC mapping into memory');

  return new Promise(resolve => {
    x(config.mapper.sicMappingsUrl, 'table:nth-of-type(2) table tr', [
      {
        sic: x('td'),
        industryTitle: x('td:nth-of-type(4)')
      }
    ]).then(result => {
      saveToMemory(result);
      resolve();
    });
  });
};

module.exports.init = loadSicMappingIntoMemory;

module.exports.getIndustryTitle = sic => {
  return store.mappings[sic];
};

module.exports.startUpdateScheduler = () => {
  console.log('Starting SIC Mapping Update Scheduler');
  setInterval(loadSicMappingIntoMemory, config.mapper.updateInterval);
};
