// // models/index.js

// const Sequelize = require('sequelize');
// const config = require('../config/config');
// const userModel = require('./users');
// const formDataModel = require('./formData');

// const sequelize = new Sequelize(config.development);

// const users = userModel(sequelize, Sequelize);
// const formData = formDataModel(sequelize, Sequelize);

// // Define associations if needed
// // User.hasMany(FormData);
// // FormData.belongsTo(User);

// module.exports = {
//   users,
//   formData,
//   sequelize  // Export sequelize instance for syncing database
// };
// models/index.js
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
  // other options
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Load models
db.User = require('./users')(sequelize, Sequelize);
db.FormData = require('./formData')(sequelize, Sequelize);

// Define associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
