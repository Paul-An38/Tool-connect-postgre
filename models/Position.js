const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Position = sequelize.define(
  'Position',
  {
    Id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    Code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'Positions',
    timestamps: false,
  }
);

module.exports = Position;
