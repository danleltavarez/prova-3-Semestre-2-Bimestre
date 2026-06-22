const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const logger = require('../middlewares/logger.middleware');
const ctrl = require('../controllers/consulta.controller');

router.use(auth);
router.use(logger);

/**
 * @swagger
 * tags:
 *   name: Consultas
 *   description: Gestão de consultas médicas
 */

/**
 * @swagger
 * /consultas:
 *   get:
 *     summary: Lista todas as consultas
 *     tags: [Consultas]
 *     responses:
 *       200:
 *         description: Lista de consultas
 */
router.get('/', ctrl.list);

/**
 * @swagger
 * /consultas/{id}:
 *   get:
 *     summary: Busca consulta por ID
 *     tags: [Consultas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Consulta encontrada
 */
router.get('/:id', ctrl.get);

/**
 * @swagger
 * /consultas:
 *   post:
 *     summary: Agenda nova consulta
 *     tags: [Consultas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id_paciente, id_medico, data_consulta]
 *             properties:
 *               id_paciente:
 *                 type: integer
 *               id_medico:
 *                 type: integer
 *               data_consulta:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *                 enum: [AGENDADA, REALIZADA, CANCELADA, FALTA]
 *               motivo:
 *                 type: string
 *               diagnostico:
 *                 type: string
 *               valor_cobrado:
 *                 type: number
 *               coberto_convenio:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Consulta agendada
 */
router.post('/', ctrl.create);

/**
 * @swagger
 * /consultas/{id}:
 *   put:
 *     summary: Atualiza consulta
 *     tags: [Consultas]
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
 * /consultas/{id}:
 *   delete:
 *     summary: Remove consulta
 *     tags: [Consultas]
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

module.exports = router;
