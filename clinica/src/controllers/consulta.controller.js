const makeCrud = require('./crud.factory');
const { Consulta, Paciente, Medico } = require('../models');
module.exports = makeCrud(Consulta, 'id_consulta', [
  { model: Paciente, as: 'paciente' },
  { model: Medico, as: 'medico' },
]);
