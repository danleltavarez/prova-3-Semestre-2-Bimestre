const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

module.exports = sequelize.define('MedicoEspecialidade', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_medico: { type: DataTypes.INTEGER, allowNull: false },
  id_especialidade: { type: DataTypes.INTEGER, allowNull: false },
}, { tableName: 'medico_especialidade', timestamps: false });
