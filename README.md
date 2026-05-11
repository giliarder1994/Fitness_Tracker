# 🏋️ Fitness Tracker - API REST

API REST para gerenciamento de treinos e exercícios físicos.
Desenvolvida com **Node.js**, **Express** e **MySQL**, utilizando autenticação JWT, validações de entrada e arquitetura em camadas para garantir organização, escalabilidade e segurança.

---

## 🚀 Tecnologias

* **Node.js** — Ambiente de execução JavaScript
* **Express** — Framework para construção da API
* **MySQL** — Banco de dados relacional
* **mysql2** — Driver MySQL para Node.js
* **JWT (JSON Web Token)** — Autenticação segura
* **bcryptjs** — Criptografia de senhas
* **dotenv** — Gerenciamento de variáveis de ambiente
* **nodemon** — Reload automático no ambiente de desenvolvimento

---

## 📁 Estrutura do Projeto

```bash id="fit001"
src/
 ├── config/
 │    └── db.js              # Configuração da conexão com MySQL
 │
 ├── controllers/
 │    ├── authController.js
 │    └── treinoController.js
 │
 ├── middlewares/
 │    └── authMiddleware.js  # Proteção de rotas via JWT
 │
 ├── routes/
 │    ├── authRoutes.js
 │    └── treinoRoutes.js
 │
 ├── services/
 │    └── treinoService.js   # Regras de negócio
 │
 ├── validators/
 │    └── treinoValidator.js # Validação de entrada
 │
 ├── app.js
 └── server.js

sql/
 └── setup.sql               # Script de criação do banco de dados
```

---

# ⚙️ Funcionalidades

## 🔐 Autenticação

* Cadastro de usuários
* Login com JWT
* Senhas criptografadas com bcrypt
* Proteção de rotas autenticadas

---

## 🏋️ Gerenciamento de Treinos

* Criar treinos
* Listar todos os treinos do usuário
* Buscar treino específico
* Excluir treino

Cada treino pode possuir múltiplos exercícios vinculados.

---

## 💪 Exercícios

Os exercícios possuem:

* Nome
* Quantidade de séries
* Quantidade de repetições
* Carga utilizada

---

## 🗄️ Estrutura do Banco de Dados

O sistema possui 3 tabelas principais:

### 👤 usuários

Armazena dados de autenticação dos usuários.

### 🏋️ treinos

Armazena os treinos cadastrados por usuário.

### 💪 exercicios

Armazena os exercícios vinculados aos treinos.

---

# ⚙️ Como rodar localmente

## 1. Clone o repositório

```bash id="fit002"
git clone https://github.com/seu-usuario/fitness-tracker.git

cd fitness-tracker
```

---

## 2. Instale as dependências

```bash id="fit003"
npm install
```

---

## 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env id="fit004"
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=fitness_tracker_2

JWT_SECRET=sua_chave_secreta
```

---

## 4. Configure o banco de dados

Execute o script SQL localizado em:

```bash id="fit005"
sql/setup.sql
```

Você pode executar utilizando o MySQL Workbench, DBeaver ou terminal MySQL.

---

## 5. Inicie o servidor

### Ambiente de desenvolvimento

```bash id="fit006"
npm run dev
```

### Ambiente normal

```bash id="fit007"
npm start
```

Servidor disponível em:

👉 [http://localhost:3000](http://localhost:3000)

---

# 📋 Principais Rotas

## 🔐 Autenticação

| Método | Rota           | Descrição                |
| ------ | -------------- | ------------------------ |
| POST   | /auth/register | Cadastro de usuário      |
| POST   | /auth/login    | Login e geração de token |

---

## 🏋️ Treinos

| Método | Rota         | Descrição            |
| ------ | ------------ | -------------------- |
| POST   | /treinos     | Criar treino         |
| GET    | /treinos     | Listar treinos       |
| GET    | /treinos/:id | Buscar treino por ID |
| DELETE | /treinos/:id | Remover treino       |

---

# 🔒 Segurança

A API utiliza:

* Autenticação JWT
* Senhas criptografadas com bcrypt
* Middleware de proteção de rotas
* Validação de dados antes da persistência
* Relacionamentos com integridade referencial no MySQL

---

# 🧠 Arquitetura e Boas Práticas

O projeto segue uma separação em camadas:

* **Controllers** → tratamento das requisições
* **Services** → regras de negócio
* **Middlewares** → autenticação e segurança
* **Validators** → validação de entrada
* **Routes** → definição dos endpoints

Além disso, o `treinoService` utiliza transações no banco de dados para garantir consistência ao salvar treinos e exercícios simultaneamente.

---

# 📈 Recursos Implementados

* CRUD de treinos
* Relacionamento entre treinos e exercícios
* Autenticação completa
* Validação de payloads
* Uso de transactions no MySQL
* Estrutura escalável para evolução futura

---

# 👨‍💻 Autor

Desenvolvido por **Giliarde Rodrigues**

Estudante de Engenharia de Software focado em desenvolvimento Back-end com Node.js, APIs REST e bancos relacionais.
