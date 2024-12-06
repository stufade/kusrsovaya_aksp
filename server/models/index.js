const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});

const Performer = require('./performer')(sequelize, DataTypes);
const Place = require('./place')(sequelize, DataTypes);
const Event = require('./event')(sequelize, DataTypes);
const TickerOrder = require('./ticketOrder')(sequelize, DataTypes);

Event.associate({ Place, Performer });
TickerOrder.associate({ Event });

module.exports = {
  sequelize,
  Performer,
  Place,
  Event,
  TickerOrder,
};
