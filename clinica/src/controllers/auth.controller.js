const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const JWT_EXPIRES = process.env.JWT_EXPIRES || '8h';

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) return res.status(400).json({ error: 'Email e senha são obrigatórios.' });

    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) return res.status(401).json({ error: 'Credenciais inválidas.' });

    const valido = await usuario.validarSenha(senha);
    if (!valido) return res.status(401).json({ error: 'Credenciais inválidas.' });

    const token = jwt.sign(
      { id: usuario.id_usuario, email: usuario.email, nome: usuario.nome },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES }
    );

    res.json({ token, usuario: { id: usuario.id_usuario, nome: usuario.nome, email: usuario.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.registro = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const usuario = await Usuario.create({ nome, email, senha });
    res.status(201).json({ id: usuario.id_usuario, nome: usuario.nome, email: usuario.email });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'Email já cadastrado.' });
    }
    res.status(500).json({ error: err.message });
  }
};
