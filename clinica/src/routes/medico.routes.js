const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const logger = require('../middlewares/logger.middleware');
const ctrl = require('../controllers/medico.controller');

router.use(auth);
router.use(logger);

/**
 * @swagger
 * tags:
 *   name: Medicos
 *   description: Gestão de médicos
 */

/**
 * @swagger
 * /medicos:
 *   get:
 *     summary: Lista todos os médicos
 *     tags: [Medicos]
 *     responses:
 *       200:
 *         description: Lista de médicos
 */
router.get('/', ctrl.list);

/**
 * @swagger
 * /medicos/{id}:
 *   get:
 *     summary: Busca médico por ID
 *     tags: [Medicos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Médico encontrado
 */
router.get('/:id', ctrl.get);

/**
 * @swagger
 * /medicos:
 *   post:
 *     summary: Cadastra novo médico
 *     tags: [Medicos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, crm, cpf, id_especialidade, valor_consulta]
 *             properties:
 *               nome:
 *                 type: string
 *               crm:
 *                 type: string
 *               cpf:
 *                 type: string
 *               telefone:
 *                 type: string
 *               email:
 *                 type: string
 *               id_especialidade:
 *                 type: integer
 *               valor_consulta:
 *                 type: number
 *               ativo:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Cadastrado
 */
router.post('/', ctrl.create);

/**
 * @swagger
 * /medicos/{id}:
 *   put:
 *     summary: Atualiza médico
 *     tags: [Medicos]
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
 * /medicos/{id}:
 *   delete:
 *     summary: Remove médico
 *     tags: [Medicos]
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
