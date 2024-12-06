module.exports = (sequelize, DataTypes) => {
    const Place = sequelize.define('Place', {
      name: { type: DataTypes.STRING, allowNull: false },
      capacity: { type: DataTypes.INTEGER, allowNull: false },
    });
    return Place;
  };
  