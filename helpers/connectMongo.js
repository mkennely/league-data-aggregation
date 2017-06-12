import mongoose from 'mongoose';

let connectMongo = () => {
  mongoose.Promise = global.Promise;
  let options = {
    server: { socketOptions: { keepAlive: 10 } },
    replset: { socketOptions: { keepAlive: 10 } },
  };
  mongoose.connect('mongodb://localhost:27017', options);
  let db = mongoose.connection;
  db.on('error', function(err){
    console.error('connection error:', err);
    process.exit(1);
  });
  return db;
}

module.exports = {
  connectMongo,
}
