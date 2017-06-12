'use strict';
const API_KEY = 'INSERT_API_KEY';

let getMatchList = (summonerId, region, weeks) => {
  console.log(`getMatchList: (${region}) ${summonerId}`);
  const RANKED_QUEUES = 'rankedQueues=RANKED_FLEX_SR,RANKED_SOLO_5x5,TEAM_BUILDER_RANKED_SOLO,'
                        + 'RANKED_TEAM_5x5';
  let beginTime;

  if (weeks !== null) {
    let miliseconds_in_week = 604800000;
    let miliseconds = (new Date).getTime() - (weeks * miliseconds_in_week);
    beginTime = `beginTime=${miliseconds}`;
  }
  return `${baseUrl(region)}/v2.2/matchlist/by-summoner/${summonerId}?${RANKED_QUEUES}&${beginTime}&api_key=${API_KEY}`;
}

let getMatch = (matchId, region) => {
  return `${baseUrl(region)}/v2.2/match/${matchId}?includeTimeline=true&api_key=${API_KEY}`;
}

let getLeague = (summonerIds, region) => {
  let summonerIdsString = summonerIds.join(',');
  summonerIdsString = summonerIdsString.substring(0, summonerIdsString.length - 1);
  return `${baseUrl(region)}/v2.5/league/by-summoner/${summonerIdsString}/entry?api_key=${API_KEY}`;
}

let baseUrl = (region) => {
  return `https://${region}.api.riotgames.com/api/lol/${region}`;
}

module.exports = {
  getMatchList,
  getMatch,
  getLeague,
}
