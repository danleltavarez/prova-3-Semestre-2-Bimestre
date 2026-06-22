const makeCrud = require('./crud.factory');
const { Especialidade } = require('../models');
module.exports = makeCrud(Especialidade, 'id_especialidade');
