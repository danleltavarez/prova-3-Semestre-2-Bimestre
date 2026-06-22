const makeCrud = require('./crud.factory');
const { Agenda, Medico } = require('../models');
module.exports = makeCrud(Agenda, 'id_agenda', [{ model: Medico, as: 'medico' }]);
