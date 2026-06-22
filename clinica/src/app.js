const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const authRoutes = require('./routes/auth.routes');
const convenioRoutes = require('./routes/convenio.routes');
const especialidadeRoutes = require('./routes/especialidade.routes');
const pacienteRoutes = require('./routes/paciente.routes');
const medicoRoutes = require('./routes/medico.routes');
const agendaRoutes = require('./routes/agenda.routes');
const consultaRoutes = require('./routes/consulta.routes');

const app = express();

app.use(cors());
app.use(express.json());

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas públicas
app.use('/api', authRoutes);

// Rotas protegidas
app.use('/api/convenios', convenioRoutes);
app.use('/api/especialidades', especialidadeRoutes);
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/medicos', medicoRoutes);
app.use('/api/agendas', agendaRoutes);
app.use('/api/consultas', consultaRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API Clínica Médica', docs: '/api-docs' });
});

module.exports = app;
