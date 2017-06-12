'use strict';
import mongoose from 'mongoose';

let summonerSchema = new mongoose.Schema({
  summonerId: Number,
  region: String,
  lastUpdated: Number,
  tier: String,
});

summonerSchema.index({'region': 1, 'summonerId': 1}, {unique: true});

let Summoners = mongoose.model('Summoners', summonerSchema);

module.exports.Summoners = Summoners;
