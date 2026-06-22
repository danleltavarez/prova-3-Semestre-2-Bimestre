// Factory que gera CRUD padrão para qualquer model
const makeCrud = (Model, pk, includes = []) => ({
  list: async (req, res) => {
    try {
      const items = await Model.findAll({ include: includes });
      res.json(items);
    } catch (err) { res.status(500).json({ error: err.message }); }
  },
  get: async (req, res) => {
    try {
      const item = await Model.findByPk(req.params.id, { include: includes });
      if (!item) return res.status(404).json({ error: 'Não encontrado.' });
      res.json(item);
    } catch (err) { res.status(500).json({ error: err.message }); }
  },
  create: async (req, res) => {
    try {
      const item = await Model.create(req.body);
      res.status(201).json(item);
    } catch (err) { res.status(400).json({ error: err.message }); }
  },
  update: async (req, res) => {
    try {
      const item = await Model.findByPk(req.params.id);
      if (!item) return res.status(404).json({ error: 'Não encontrado.' });
      await item.update(req.body);
      res.json(item);
    } catch (err) { res.status(400).json({ error: err.message }); }
  },
  remove: async (req, res) => {
    try {
      const item = await Model.findByPk(req.params.id);
      if (!item) return res.status(404).json({ error: 'Não encontrado.' });
      await item.destroy();
      res.status(204).send();
    } catch (err) { res.status(500).json({ error: err.message }); }
  },
});

module.exports = makeCrud;
