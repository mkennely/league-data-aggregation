import { Kindred, REGIONS, LIMITS, print } from 'kindred-api';
import { apiKey } from './config';

const lolapi = new Kindred({
  key: apiKey,
  defaultRegion: REGIONS.NORTH_AMERICA,
  limits: LIMITS.PROD, 
	debug: true,
	spread: true,
  showHeaders: true,
  timeout: 10000,
  showKey: true,
	retryOptions: {
    auto: true,
    numberOfRetriesBeforeBreak: 3,
  }
});

module.exports = lolapi;