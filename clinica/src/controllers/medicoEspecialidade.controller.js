const { MedicoEspecialidade, Medico, Especialidade } = require('../models');

exports.list = async (req, res) => {
  try {
    const items = await MedicoEspecialidade.findAll({
      include: [
        { model: Medico, as: 'medico' },
        { model: Especialidade, as: 'especialidade' },
      ],
    });
    res.json(items);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.create = async (req, res) => {
  try {
    const { id_medico, id_especialidade } = req.body;
    const item = await MedicoEspecialidade.create({ id_medico, id_especialidade });
    res.status(201).json(item);
  } catch (err) { res.status(400).json({ error: err.message }); }
};

exports.remove = async (req, res) => {
  try {
    const item = await MedicoEspecialidade.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Não encontrado.' });
    await item.destroy();
    res.status(204).send();
  } catch (err) { res.status(500).json({ error: err.message }); }
};
