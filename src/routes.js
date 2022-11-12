const fs = require('fs');
const path = require('path');
module.exports = class Main {
  constructor(app, config) {
    app.get('/', (req, res) => {

    });
    return app;
  }
};