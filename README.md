# Fitness Tracker API

API REST para gerenciamento de treinos.

## Tecnologias
- Node.js + Express
- MySQL
- JWT para autenticação
- bcryptjs para hash de senhas

## Configuração

Crie um arquivo `.env` na raiz do projeto:

```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=fitness_tracker
JWT_SECRET=seu_segredo_aqui
```

Execute o SQL de setup:
```bash
mysql -u root -p < sql/setup.sql
```

Instale as dependências e inicie:
```bash
npm install
npm run dev
```

---

## Rotas da API

### Autenticação

| Método | Rota             | Descrição         | Auth |
|--------|-----------------|-------------------|------|
| POST   | /auth/register  | Cadastrar usuário | Não  |
| POST   | /auth/login     | Login             | Não  |

**POST /auth/register**
```json
{ "nome": "João", "email": "joao@email.com", "senha": "123456" }
```

**POST /auth/login**
```json
{ "email": "joao@email.com", "senha": "123456" }
```
Retorna: `{ "token": "..." }`

---

### Treinos

Todas as rotas de treino exigem o header:
```
Authorization: Bearer <token>
```

| Método | Rota          | Descrição              |
|--------|--------------|------------------------|
| POST   | /treinos     | Criar treino           |
| GET    | /treinos     | Listar todos os treinos|
| GET    | /treinos/:id | Buscar treino por ID   |
| DELETE | /treinos/:id | Deletar treino         |

**POST /treinos**
```json
{
  "nome": "Treino A",
  "grupo_muscular": "Peito e Tríceps",
  "exercicios": [
    { "nome": "Supino Reto", "series": 4, "repeticoes": 10, "carga": 80 },
    { "nome": "Crucifixo", "series": 3, "repeticoes": 12, "carga": 14 }
  ]
}
```
