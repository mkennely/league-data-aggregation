'use strict';
import { getMatch } from './lolapi.js';
import { processMatch } from './processMatch.js';
import { NoSchema } from '../models/NoSchema.js';

let processMatchList = (error, res, done, crawler) => {
  /* For each match in the list, a request is made to the Riot API for details about that match */
  const { matches } = JSON.parse(res.body);
  if (error) { console.log(error); }

  let alreadySaved = removeAlreadySaved(matches);
  console.log('already saved:', alreadySaved);

  matches.forEach((match) => {
    //TODO: check if the match is in the database
    crawler.queue({
      url: getMatch(match.matchId, match.region),
      callback: processMatch,
    });
  });

  done();
}

let removeAlreadySaved = (matches) => {
  const region = matches[0]['region'];
  let matchIdList = [];

  matches.forEach((match) => {
    matchIdList.push(match.matchId);
  });

  NoSchema.find({'matchId': {$in: matchIdList}, 'region': region}, {'matchId': 1}, (err, docs) => {
    console.log(docs);
  });
}

module.exports = {
  processMatchList,
}
