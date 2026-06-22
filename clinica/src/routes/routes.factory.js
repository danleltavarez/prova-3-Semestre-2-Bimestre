const router = require('express').Router;
const auth = require('../middlewares/auth.middleware');
const logger = require('../middlewares/logger.middleware');

const makeRoutes = (ctrl) => {
  const r = router();
  r.use(auth);
  r.use(logger);
  r.get('/', ctrl.list);
  r.get('/:id', ctrl.get);
  r.post('/', ctrl.create);
  r.put('/:id', ctrl.update);
  r.delete('/:id', ctrl.remove);
  return r;
};

module.exports = makeRoutes;
