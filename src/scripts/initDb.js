require('dotenv').config();
const db = require('../config/db');

async function init() {
    console.log('Tentando conectar...');
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(100),
      email VARCHAR(100) UNIQUE,
      senha VARCHAR(255)
    );
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS alimentos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(100),
      proteina FLOAT,
      carbo FLOAT,
      gordura FLOAT,
      calorias_base FLOAT
    );
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS diario_alimentar (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      alimento_id INT,
      quantidade FLOAT,
      data DATETIME,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (alimento_id) REFERENCES alimentos(id)
    );
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS treinos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      nome VARCHAR(100),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `);

  console.log('Banco inicializado!');
  process.exit();
}

init();