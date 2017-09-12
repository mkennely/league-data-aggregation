import mongoose from 'mongoose';
import { dbUser, dbPass, mongoUrl } from './config';

const uri = `mongodb://${dbUser}:${dbPass}@${mongoUrl}`;
const options = { 
  useMongoClient: true
};

mongoose.Promise = global.Promise;

mongoose.connect(uri, options).then(
  () => console.log('MongoDB Connection Success'),
  (error) => console.log('Mongo Error:', error)
);

export default mongoose.connection;