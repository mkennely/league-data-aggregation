import mongoose from 'mongoose';
import { dbUser, dbPass, mongoUrl } from './config';

export default () => {
	const uri = `mongodb://${dbUser}:${dbPass}@${mongoUrl}`;
	const options = { 
		useMongoClient: true
	};

	mongoose.Promise = global.Promise;

	mongoose.connect(uri, options).then(
		() => console.log('MongoDB Connection Success'),
		(err) => console.log('Mongo Error:', error)
	);

	return mongoose.connection;
}