const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const logger = require('../middlewares/logger.middleware');
const ctrl = require('../controllers/paciente.controller');

router.use(auth);
router.use(logger);

/**
 * @swagger
 * tags:
 *   name: Pacientes
 *   description: Gestão de pacientes
 */

/**
 * @swagger
 * /pacientes:
 *   get:
 *     summary: Lista todos os pacientes
 *     tags: [Pacientes]
 *     responses:
 *       200:
 *         description: Lista de pacientes
 */
router.get('/', ctrl.list);

/**
 * @swagger
 * /pacientes/{id}:
 *   get:
 *     summary: Busca paciente por ID
 *     tags: [Pacientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Paciente encontrado
 *       404:
 *         description: Não encontrado
 */
router.get('/:id', ctrl.get);

/**
 * @swagger
 * /pacientes:
 *   post:
 *     summary: Cadastra novo paciente
 *     tags: [Pacientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, cpf, data_nascimento, sexo]
 *             properties:
 *               nome:
 *                 type: string
 *               cpf:
 *                 type: string
 *               data_nascimento:
 *                 type: string
 *                 format: date
 *               sexo:
 *                 type: string
 *                 enum: [M, F, O]
 *               telefone:
 *                 type: string
 *               email:
 *                 type: string
 *               logradouro:
 *                 type: string
 *               cidade:
 *                 type: string
 *               estado:
 *                 type: string
 *               id_convenio:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Cadastrado
 */
router.post('/', ctrl.create);

/**
 * @swagger
 * /pacientes/{id}:
 *   put:
 *     summary: Atualiza paciente
 *     tags: [Pacientes]
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
 * /pacientes/{id}:
 *   delete:
 *     summary: Remove paciente
 *     tags: [Pacientes]
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
