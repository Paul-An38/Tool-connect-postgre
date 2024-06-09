const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');
const Appointment = sequelize.define(
  'Appointment',
  {
    Id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    Position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ClergyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    EntityName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ClergyID: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    tableName: 'Appointments',
    timestamps: false,
  }
);
Appointment.associate = (models) => {
  Appointment.hasMany(models.Clergy, {
    foreignKey: 'ClergyID',
  });
};
module.exports = Appointment;
