const makeCrud = require('./crud.factory');
const { Paciente, Convenio } = require('../models');
module.exports = makeCrud(Paciente, 'id_paciente', [{ model: Convenio, as: 'convenio' }]);
