const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

module.exports = sequelize.define('Convenio', {
  id_convenio: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING(100), allowNull: false },
  cnpj: { type: DataTypes.CHAR(18), allowNull: false, unique: true },
  telefone: { type: DataTypes.STRING(20) },
  ativo: { type: DataTypes.BOOLEAN, defaultValue: true },
}, { tableName: 'convenio', timestamps: false });
