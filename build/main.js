'use strict';

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

var _lolapi = require('./lolapi');

var _lolapi2 = _interopRequireDefault(_lolapi);

var _Summoner = require('./models/Summoner');

var _Summoner2 = _interopRequireDefault(_Summoner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var aggregationLoop = function aggregationLoop(id) {
  return _lolapi2.default.Matchlist.get({ id: id }).then(function (matchlist) {
    return console.log(matchlist);
  });
};

var fetchMatches = function fetchMatches(matchList) {};

var matchData = function matchData(matchList) {};

var saveSummonersFromMatchData = function saveSummonersFromMatchData(matchData) {
  var participantIdentities = matchData.participantIdentities;


  if (participantIdentities == undefined) return;

  participantIdentities.forEach(function (participant) {
    var accountId = participant.accountId,
        platformId = participant.platformId,
        profileIcon = participant.profileIcon,
        summonerId = participant.summonerId,
        summonerName = participant.summonerName;


    var summoner = new _Summoner2.default({
      accountId: accountId,
      platformId: platformId,
      profileIcon: profileIcon,
      summonerId: summonerId,
      summonerName: summonerName,

      tier: "NYI"
    });

    summoner.save().catch(console.log);
  });
};

_db2.default.once('open', function () {
  return aggregationLoop(32932398).then(function () {
    return console.log('done');
  });
});