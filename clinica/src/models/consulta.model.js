const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

module.exports = sequelize.define('Consulta', {
  id_consulta: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_paciente: { type: DataTypes.INTEGER, allowNull: false },
  id_medico: { type: DataTypes.INTEGER, allowNull: false },
  data_consulta: { type: DataTypes.DATE, allowNull: false },
  status: { type: DataTypes.STRING(20), defaultValue: 'AGENDADA' },
  motivo: { type: DataTypes.TEXT },
  diagnostico: { type: DataTypes.TEXT },
  valor_cobrado: { type: DataTypes.DECIMAL(10, 2) },
  coberto_convenio: { type: DataTypes.BOOLEAN, defaultValue: false },
  data_criacao: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { tableName: 'consulta', timestamps: false });
