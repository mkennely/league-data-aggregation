# League Data Aggregation
Need lots of league of legends games? This is the script for it.

## Getting Started
This repository will not run unless a MongoDB server is running on `localhost:27017`.

* `$ git clone https://github.com/rinkelm/league-data-aggregation.git`
* `$ npm install`
* Add your API key to `libs/lolapi.js`
* `$ npm start`

# Notes
This currently uses old API endpoints. I've used an API wrapper in my other projects, but I built a custom API request system for this because it needs to be finely tuned in order to return matches quickly. When I used an API wrapper I lacked the control to prevent memory leaks which prevented this application from running constantly and collecting millions of games. 
