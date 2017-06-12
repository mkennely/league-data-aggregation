'use strict';

const LEAGUES = {
  'UNRANKED': 0,
  'BRONZE': 1,
  'SILVER': 2,
  'GOLD': 3,
  'PLATINUM': 4,
  'DIAMOND': 5,
  'MASTER': 6,
  'CHALLENGER': 7,
}

let highestLeague = (leagues) => {
  let ranks = [];
  let highestRank = 'UNRANKED';

  if (leagues == undefined) {
    return 'UNRANKED';
  }

  leagues.forEach((league) => {
    ranks.push(league.tier);
  });

  ranks.forEach((rank) => {
    if (LEAGUES[rank] > LEAGUES[highestRank]) {
      highestRank = rank;
    }
  });

  return highestRank;
}

module.exports = {
  highestLeague,
}
