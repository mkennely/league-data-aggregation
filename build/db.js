'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var uri = 'mongodb://' + _config.dbUser + ':' + _config.dbPass + '@' + _config.mongoUrl;
var options = {
  useMongoClient: true
};

_mongoose2.default.Promise = global.Promise;

_mongoose2.default.connect(uri, options).then(function () {
  return console.log('MongoDB Connection Success');
}, function (error) {
  return console.log('Mongo Error:', error);
});

exports.default = _mongoose2.default.connection;