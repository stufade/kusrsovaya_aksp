module.exports = (sequelize, DataTypes) => {
    const Performer = sequelize.define('Performer', {
      name: { type: DataTypes.STRING, allowNull: false },
    });
    return Performer;
  };
  