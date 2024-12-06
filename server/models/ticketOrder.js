module.exports = (sequelize, DataTypes) => {
    const TickerOrder = sequelize.define('TickerOrder', {
      userName: { type: DataTypes.STRING, allowNull: false },
      phone: { type: DataTypes.STRING, allowNull: false },
    });
  
    TickerOrder.associate = (models) => {
      TickerOrder.belongsTo(models.Event, {foreignKey: 'eventId'});
    };
  
    return TickerOrder;
  };
  