const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');
const Appointment = require('./Appointment');

const Clergy = sequelize.define(
  'Clergy',
  {
    Id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    STName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    GroupID: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    tableName: 'Clergies',
    timestamps: false,
  }
);
Clergy.associate = (models) => {
  Clergy.hasMany(models.Appointment, {
    foreignKey: 'ClergyID',
  });
};
module.exports = Clergy;
