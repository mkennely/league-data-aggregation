League Data Aggregation
==================================

Fetches and saves games 

ES6 support. 

Getting Started
---------------

1) `$ git clone https://github.com/rinkelm/league-data-aggregation.git`

2) Create `src/config.js` from `src/config.example.js`
If you're running mongo locally, the address is `localhost:27017`. By default you don't need a username and password.

If you have a developer key change `limits: LIMITS.PROD` to `limits: LIMITS.DEV` in `src/lolapi.js`.

3) `$ npm install`

4) Collect and save games with `npm start`