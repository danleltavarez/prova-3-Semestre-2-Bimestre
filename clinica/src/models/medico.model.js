const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

module.exports = sequelize.define('Medico', {
  id_medico: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING(150), allowNull: false },
  crm: { type: DataTypes.STRING(20), allowNull: false, unique: true },
  cpf: { type: DataTypes.CHAR(14), allowNull: false, unique: true },
  telefone: { type: DataTypes.STRING(20) },
  email: { type: DataTypes.STRING(150) },
  id_especialidade: { type: DataTypes.INTEGER, allowNull: false },
  valor_consulta: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  ativo: { type: DataTypes.BOOLEAN, defaultValue: true },
}, { tableName: 'medico', timestamps: false });
