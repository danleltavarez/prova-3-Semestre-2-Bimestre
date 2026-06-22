const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const logger = require('../middlewares/logger.middleware');
const ctrl = require('../controllers/convenio.controller');

router.use(auth);
router.use(logger);

/**
 * @swagger
 * tags:
 *   name: Convenios
 *   description: Gestão de convênios
 */

/**
 * @swagger
 * /convenios:
 *   get:
 *     summary: Lista todos os convênios
 *     tags: [Convenios]
 *     responses:
 *       200:
 *         description: Lista de convênios
 */
router.get('/', ctrl.list);

/**
 * @swagger
 * /convenios/{id}:
 *   get:
 *     summary: Busca convênio por ID
 *     tags: [Convenios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Convênio encontrado
 *       404:
 *         description: Não encontrado
 */
router.get('/:id', ctrl.get);

/**
 * @swagger
 * /convenios:
 *   post:
 *     summary: Cria novo convênio
 *     tags: [Convenios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, cnpj]
 *             properties:
 *               nome:
 *                 type: string
 *               cnpj:
 *                 type: string
 *               telefone:
 *                 type: string
 *               ativo:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Criado com sucesso
 */
router.post('/', ctrl.create);

/**
 * @swagger
 * /convenios/{id}:
 *   put:
 *     summary: Atualiza convênio
 *     tags: [Convenios]
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
 * /convenios/{id}:
 *   delete:
 *     summary: Remove convênio
 *     tags: [Convenios]
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
