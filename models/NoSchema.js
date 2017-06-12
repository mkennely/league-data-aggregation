'use strict';
import mongoose from 'mongoose';

/*
 This model has no schema. Mongo will save anything you provide it.
  This is bad practice and will be replaced later.
  It's role is for testing only. Don't use this in production.
*/

let noSchema = new mongoose.Schema({}, { strict: false });
noSchema.index({'matchId': 1, 'region': 1}, {unique: true});
let NoSchema = mongoose.model('NoSchema', noSchema);

module.exports.NoSchema = NoSchema;
