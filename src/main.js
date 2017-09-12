import db from './db';
import lolapi from './lolapi';
import Summoner from './models/Summoner';

const aggregationLoop = (id) => {
  fetchMatchList(id)
    .then(fetchMatchData)
    .then(matchesData => {
      return Promise.all(
        saveMatches(matchesData),
        saveSummoners(matchesData)
      )
    .then(aggregationLoop())
    .catch(error => console.log('Error:': error))
    });

}

const fetchMatchList = (id) => {
  return lolapi.Matchlist.get({ id });
}

const fetchMatchData = (matchList) => {
  matchList.map(() => fetchMatch())
}

const saveSummonersFromMatchData = (matchData) => {
  const { participantIdentities } = matchData;

  if (participantIdentities == undefined) return;

  participantIdentities.forEach(participant => {
    const { 
      accountId,
      platformId,
      profileIcon,
      summonerId,
      summonerName,
    } = participant;

    const summoner = new Summoner({
      accountId,
      platformId,
      profileIcon,
      summonerId,
      summonerName,
      
      tier: "NYI"
    });

    summoner.save().catch(console.log);
  });
}

db.once('open', () =>
  aggregationLoop(32932398)
    .then(() => console.log('done'))
); 