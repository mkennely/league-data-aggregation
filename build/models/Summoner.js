'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var summonerSchema = new _mongoose.Schema({
  accountId: Number,
  platformId: String,
  profileIcon: Number,
  summonerId: Number,
  summonerName: String,
  tier: String
});

summonerSchema.index({ 'platformId': 1, 'summonerId': 1 }, { unique: true });

var Summoner = _mongoose2.default.model('Summoners', summonerSchema);

exports.default = Summoner;