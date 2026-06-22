const makeCrud = require('./crud.factory');
const { Convenio } = require('../models');
module.exports = makeCrud(Convenio, 'id_convenio');
