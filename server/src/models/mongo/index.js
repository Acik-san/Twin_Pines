const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const config = require(__dirname + '/../../config/mongoConfig.json')[
  process.env.NODE_ENV || 'development'
];

mongoose.connect(`mongodb://${config.host}:${config.port}/${config.database}`);

const basename = path.basename(__filename);

const db = {};

fs.readdirSync(__dirname)
  .filter(file => file !== basename && /.js$/i.test(file))
  .forEach(file => {
    const model = require(path.resolve(__dirname, file));
    db[model.modelName] = model;
  });

module.exports = db;
