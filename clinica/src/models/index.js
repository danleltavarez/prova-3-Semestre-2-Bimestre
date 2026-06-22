const sequelize = require('../config/database');
const Convenio = require('./convenio.model');
const Especialidade = require('./especialidade.model');
const Paciente = require('./paciente.model');
const Medico = require('./medico.model');
const Agenda = require('./agenda.model');
const Consulta = require('./consulta.model');
const Usuario = require('./usuario.model');

// Associações
Paciente.belongsTo(Convenio, { foreignKey: 'id_convenio', as: 'convenio' });
Convenio.hasMany(Paciente, { foreignKey: 'id_convenio', as: 'pacientes' });

Medico.belongsTo(Especialidade, { foreignKey: 'id_especialidade', as: 'especialidade' });
Especialidade.hasMany(Medico, { foreignKey: 'id_especialidade', as: 'medicos' });

Agenda.belongsTo(Medico, { foreignKey: 'id_medico', as: 'medico' });
Medico.hasMany(Agenda, { foreignKey: 'id_medico', as: 'agendas' });

Consulta.belongsTo(Paciente, { foreignKey: 'id_paciente', as: 'paciente' });
Consulta.belongsTo(Medico, { foreignKey: 'id_medico', as: 'medico' });
Paciente.hasMany(Consulta, { foreignKey: 'id_paciente', as: 'consultas' });
Medico.hasMany(Consulta, { foreignKey: 'id_medico', as: 'consultas' });

// Relação N:N entre Medico e Especialidade via MedicoEspecialidade (tabela pivô)
const MedicoEspecialidade = require('./medicoEspecialidade.model');
Medico.belongsToMany(Especialidade, {
  through: MedicoEspecialidade,
  foreignKey: 'id_medico',
  as: 'especialidades',
});
Especialidade.belongsToMany(Medico, {
  through: MedicoEspecialidade,
  foreignKey: 'id_especialidade',
  as: 'medicos_pivot',
});

module.exports = {
  sequelize,
  Convenio,
  Especialidade,
  Paciente,
  Medico,
  Agenda,
  Consulta,
  Usuario,
  MedicoEspecialidade,
};
