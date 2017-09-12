import mongoose, { Schema } from 'mongoose';

let summonerSchema = new Schema({
  accountId: Number,
  platformId: String,
  profileIcon: Number,
  summonerId: Number,
  summonerName: String,
  tier: String,
});

summonerSchema.index(
  { 'platformId': 1, 'summonerId': 1 },
  { unique: true }
);

let Summoner = mongoose.model('Summoners', summonerSchema);

export default Summoner; 