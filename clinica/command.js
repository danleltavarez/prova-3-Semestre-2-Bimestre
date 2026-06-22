require('dotenv').config();
const { sequelize } = require('./src/models');

const command = process.argv[2];

async function migrate() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco estabelecida.');
    await sequelize.sync({ alter: true });
    console.log('Migrations executadas com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('Erro ao executar migrations:', error);
    process.exit(1);
  }
}

async function migrate_fresh() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco estabelecida.');
    await sequelize.sync({ force: true });
    console.log('Banco recriado com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('Erro:', error);
    process.exit(1);
  }
}

switch (command) {
  case 'migrate':
    migrate();
    break;
  case 'migrate:fresh':
    migrate_fresh();
    break;
  default:
    console.log('Comandos disponíveis:');
    console.log('  node command.js migrate        - Executa as migrations');
    console.log('  node command.js migrate:fresh  - Recria o banco do zero');
    process.exit(0);
}
