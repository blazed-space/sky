/*
  Sky for Node.JS
  @LICENSE MIT
  @AUTHOR Tyler Ruff
  @PUBLISHER Blazed Publishing
*/

require('dotenv').config();

const jsonPackage = require('./package.json');

console.log(`Starting Sky for Node.js (v${jsonPackage.version})...`);

const Contract = require('./src/contract.js');
const Server = require('./bin/server.js');

const cfg = {
    domain: process.env.DOMAIN,
    hostname: process.env.HOSTNAME,
    name: process.env.NAME,
    genesis: genBlock,
    period: [0, 0],
    listenPort: process.env.PORT,
};
const blockchain = new Contract(cfg);
s = new Server(cfg);