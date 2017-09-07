import connectMongo from './db';
import lolapi from './apiConfig';
import mongoose from 'mongoose';

const aggregationLoop = (id) => {
	lolapi.Matchlist.get({id})
		.then(matchList => {
			matchList.matches.forEach(match => {
				lolapi.Match.by.id(match.gameId)
				.then(matchData => console.log(matchData));
			});
		})
		.catch(err => console.log(err));
}

aggregationLoop(32932398);

/**
let db = connectMongo();

db.once('open', () => {
	let Schema = mongoose.Schema;
	let AnimalSchema = new Schema({
		type: String,
		size: String,
		color: String,
		mass: Number,
		name: String
	});

	let Animal = mongoose.model("Animal", AnimalSchema);

	let elephant = new Animal({
		type: 'elephant',
		size: 'big',
		color: 'gray',
		mass: 6000,
		name: 'Lawrence'
	});
	elephant.save().then(
		() => db.close(),
		(err) => console.log('error', error)
	);
}); **/