const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const logger = require('../middlewares/logger.middleware');
const ctrl = require('../controllers/especialidade.controller');
const pivotCtrl = require('../controllers/medicoEspecialidade.controller');

router.use(auth);
router.use(logger);

/**
 * @swagger
 * tags:
 *   name: Especialidades
 *   description: Gestão de especialidades médicas
 */

/**
 * @swagger
 * /especialidades:
 *   get:
 *     summary: Lista todas as especialidades
 *     tags: [Especialidades]
 *     responses:
 *       200:
 *         description: Lista de especialidades
 */
router.get('/', ctrl.list);

/**
 * @swagger
 * /especialidades/{id}:
 *   get:
 *     summary: Busca especialidade por ID
 *     tags: [Especialidades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Especialidade encontrada
 */
router.get('/:id', ctrl.get);

/**
 * @swagger
 * /especialidades:
 *   post:
 *     summary: Cria nova especialidade
 *     tags: [Especialidades]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome]
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *     responses:
 *       201:
 *         description: Criada
 */
router.post('/', ctrl.create);

/**
 * @swagger
 * /especialidades/{id}:
 *   put:
 *     summary: Atualiza especialidade
 *     tags: [Especialidades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Atualizada
 */
router.put('/:id', ctrl.update);

/**
 * @swagger
 * /especialidades/{id}:
 *   delete:
 *     summary: Remove especialidade
 *     tags: [Especialidades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Removida
 */
router.delete('/:id', ctrl.remove);

/**
 * @swagger
 * /especialidades/vinculos:
 *   get:
 *     summary: Lista vínculos médico-especialidade (tabela pivô)
 *     tags: [Especialidades]
 *     responses:
 *       200:
 *         description: Lista de vínculos
 */
router.get('/vinculos', pivotCtrl.list);

/**
 * @swagger
 * /especialidades/vinculos:
 *   post:
 *     summary: Cria vínculo médico-especialidade
 *     tags: [Especialidades]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id_medico, id_especialidade]
 *             properties:
 *               id_medico:
 *                 type: integer
 *               id_especialidade:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Vínculo criado
 */
router.post('/vinculos', pivotCtrl.create);

/**
 * @swagger
 * /especialidades/vinculos/{id}:
 *   delete:
 *     summary: Remove vínculo médico-especialidade
 *     tags: [Especialidades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Removido
 */
router.delete('/vinculos/:id', pivotCtrl.remove);

module.exports = router;
