CREATE DATABASE IF NOT EXISTS fitness_tracker;
USE fitness_tracker;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS alimentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    proteina DECIMAL(10,2) DEFAULT 0,
    carbo DECIMAL(10,2) DEFAULT 0,
    gordura DECIMAL(10,2) DEFAULT 0,
    fibras DECIMAL(10,2) DEFAULT 0,
    calorias_base DECIMAL(10,2) DEFAULT 0,
    categoria VARCHAR(50) --Ex: Proteina, Carboidrato...
);

CREATE TABLE IF NOT EXISTS diario_alimentar (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    user_id INT NOT NULL,
    alimento_id INT NOT NULL,
    quantidade DECIMAL(10,2) NOT NULL, -- em gramas
    data DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (alimento_id) REFERENCES alimento(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS exercicios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    categoria VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS diario_treino (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    exercicio_id INT NOT NULL,
    series INT NOT NULL,
    repeticoes INT NOT NULL,
    carga DECIMAL(10,2) NOT NULL,
    data  DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (exercicio_id) REFERENCES exercicios(id) ON DELETE CASCADE
);