const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const logger = require('../middlewares/logger.middleware');
const ctrl = require('../controllers/agenda.controller');

router.use(auth);
router.use(logger);

/**
 * @swagger
 * tags:
 *   name: Agendas
 *   description: Gestão de agenda dos médicos
 */

/**
 * @swagger
 * /agendas:
 *   get:
 *     summary: Lista todos os horários de agenda
 *     tags: [Agendas]
 *     responses:
 *       200:
 *         description: Lista de horários
 */
router.get('/', ctrl.list);

/**
 * @swagger
 * /agendas/{id}:
 *   get:
 *     summary: Busca horário por ID
 *     tags: [Agendas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Horário encontrado
 */
router.get('/:id', ctrl.get);

/**
 * @swagger
 * /agendas:
 *   post:
 *     summary: Cadastra horário de agenda
 *     tags: [Agendas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id_medico, dia_semana, hora_inicio, hora_fim]
 *             properties:
 *               id_medico:
 *                 type: integer
 *               dia_semana:
 *                 type: integer
 *                 description: "0=Dom, 1=Seg, 2=Ter, 3=Qua, 4=Qui, 5=Sex, 6=Sáb"
 *               hora_inicio:
 *                 type: string
 *                 example: "08:00"
 *               hora_fim:
 *                 type: string
 *                 example: "18:00"
 *     responses:
 *       201:
 *         description: Cadastrado
 */
router.post('/', ctrl.create);

/**
 * @swagger
 * /agendas/{id}:
 *   put:
 *     summary: Atualiza horário de agenda
 *     tags: [Agendas]
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
 *         description: Atualizado
 */
router.put('/:id', ctrl.update);

/**
 * @swagger
 * /agendas/{id}:
 *   delete:
 *     summary: Remove horário de agenda
 *     tags: [Agendas]
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
router.delete('/:id', ctrl.remove);

module.exports = router;
