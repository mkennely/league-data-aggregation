'use strict';

var _kindredApi = require('kindred-api');

var _config = require('./config');

var lolapi = new _kindredApi.Kindred({
  key: _config.apiKey,
  defaultRegion: _kindredApi.REGIONS.NORTH_AMERICA,
  limits: _kindredApi.LIMITS.PROD,
  //debug: true,
  spread: true,
  showHeaders: true,
  timeout: 10000,
  showKey: true,
  retryOptions: {
    auto: true,
    numberOfRetriesBeforeBreak: 3
  }
});

module.exports = lolapi;