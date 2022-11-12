const fs = require('fs');

module.exports = class Server {
  constructor(config) {
    const express = require('express');
    let app = express();
    const port = config.listenPort | 8080;
    app.use(express.static('public'));
    app.use(express.static('src'));
    app.get('/', (req, res) => {
      res.send('Hello World!');
    });
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
    const fs = require('fs');
    const path = require('path');
  }
};