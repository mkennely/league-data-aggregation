import { getMatchList } from './libs/lolapi.js';
import { processMatchList } from './libs/processMatchList.js';
import { connectMongo } from './helpers/connectMongo.js';
import { Summoners } from './models/Summoners.js';
import { createCrawler } from './helpers/createCrawler.js';

const WEEKS_TO_SEARCH = 1;
const SEED_SUMMONERS = {
  'NA': 34642243 // ACCOUNT ID Biomarker
};

let crawler = createCrawler();
let db = connectMongo();

db.once('open', function() {
  /*
   Initialize the crawler by grabbing the least-recently updated summoner.
   If there are no summoners in the database, it will use SEED_SUMMONERS.
  */
  let currentTime = (new Date).getTime();

  Summoners.findOneAndUpdate({}, {$set: {'lastUpdated': currentTime}}, {'lastUpdated': -1}, (err, summoner) => {
    if (summoner == undefined) {
      for (let region in SEED_SUMMONERS) {
        crawler.queue({
          url: getMatchList(SEED_SUMMONERS[region], region, WEEKS_TO_SEARCH),
          callback: processMatchList,
        });
      }
    } else {
      crawler.queue({
        url: getMatchList(summoner.summonerId, summoner.region, WEEKS_TO_SEARCH),
        callback: processMatchList,
      });
    }
  });
});

crawler.on('drain', function() {
  /*
    When the crawler has no more URL's to grab, the matchlist for the least-recently updated summoner is added.
  */
  let currentTime = (new Date).getTime();

  Summoners.findOneAndUpdate({}, {$set: {'lastUpdated': currentTime}}, {'lastUpdated': -1}, (err, summoner) => {
    crawler.queue({
      url: getMatchList(summoner.summonerId, summoner.region, WEEKS_TO_SEARCH),
      callback: processMatchList,
    });
  });
});
