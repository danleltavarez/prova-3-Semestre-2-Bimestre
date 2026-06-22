const makeCrud = require('./crud.factory');
const { Medico, Especialidade } = require('../models');
module.exports = makeCrud(Medico, 'id_medico', [{ model: Especialidade, as: 'especialidade' }]);
