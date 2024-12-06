module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('Event', {
      price: { type: DataTypes.FLOAT, allowNull: false },
      date: { type: DataTypes.DATE, allowNull: false },
      image: { type: DataTypes.STRING },
    });
  
    Event.associate = (models) => {
      Event.belongsTo(models.Place, {foreignKey: 'placeId'});
      Event.belongsToMany(models.Performer, { through: 'EventPerformers' });
    };
  
    return Event;
  };
  