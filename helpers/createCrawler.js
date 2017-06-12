'use strict';
import Crawler from '../libs/crawler.js';

let createCrawler = () => {
  return new Crawler({
    maxConnections: 10,
    timeout: 15000,
    jQuery: false,

    // Global Callback after each request
    callback: function (error, res, done) {
      if (error) {
        console.log(error);
      } else {
        console.log('Default Crawler Response. You found (or made >.<) a bug.');
      }
      done();
    }
  });
}

module.exports = {
  createCrawler,
}
