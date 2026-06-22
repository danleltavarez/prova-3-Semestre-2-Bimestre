const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

module.exports = sequelize.define('Agenda', {
  id_agenda: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_medico: { type: DataTypes.INTEGER, allowNull: false },
  dia_semana: { type: DataTypes.SMALLINT, allowNull: false },
  hora_inicio: { type: DataTypes.TIME, allowNull: false },
  hora_fim: { type: DataTypes.TIME, allowNull: false },
}, { tableName: 'agenda', timestamps: false });
