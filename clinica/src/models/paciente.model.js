const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

module.exports = sequelize.define('Paciente', {
  id_paciente: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING(150), allowNull: false },
  cpf: { type: DataTypes.CHAR(14), allowNull: false, unique: true },
  data_nascimento: { type: DataTypes.DATEONLY, allowNull: false },
  sexo: { type: DataTypes.CHAR(1), allowNull: false },
  telefone: { type: DataTypes.STRING(20) },
  email: { type: DataTypes.STRING(150) },
  logradouro: { type: DataTypes.STRING(200) },
  cidade: { type: DataTypes.STRING(100) },
  estado: { type: DataTypes.CHAR(2) },
  id_convenio: { type: DataTypes.INTEGER },
  data_cadastro: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { tableName: 'paciente', timestamps: false });
