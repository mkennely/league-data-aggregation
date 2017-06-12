'use strict';
import { highestLeague } from './processLeague.js';
import { getLeague } from './lolapi.js';
import { NoSchema } from '../models/NoSchema.js';
import { Summoners } from '../models/Summoners.js';

let processMatch = (error, res, done, crawler) => {
  if (error) { console.log(error); }
  const match = JSON.parse(res.body);
  console.log(`Processing Match: (${match.region}) ${match.matchId}`);
  if (match.status !== undefined) {
    console.log(`${match.status.status_code}: ${match.status.message}`);
    done();
    return;
  }

  let summonerIds = getSummonerIds(match);
  crawler.queue({
    url: getLeague(summonerIds, match.region),
    callback: (error, res, done) => {
      if (error) { console.log(error); }
      const league = JSON.parse(res.body);
      let summonerDocuments = summonerIds.map((summonerId) => {
        return {
          summonerId,
          region: match.region,
          lastUpdated: 0,
          tier: highestLeague(league[summonerId]),
        };
      });

      Summoners.insertMany(summonerDocuments);
      done();
    }
  });


  //TODO: format data from the match

  //TODO: Replace NoSchema with a real schema.
  //      Do not use this in production.
  let Match = new NoSchema(match);
  Match.save();

  done();
}



let getSummonerIds = (match) => {
  /* Match is an object from the RIOT API. Returns all summoner ids. */
  const { participantIdentities } = match;
  let summonerIds = [];

  participantIdentities.forEach((participant) => {
    let summonerId = participant.player.summonerId;
    summonerIds.push(summonerId);
  });

  return summonerIds;
}

module.exports = {
  processMatch,
}
