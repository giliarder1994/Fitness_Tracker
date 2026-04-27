const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { nome, email, senha } = req.body;

  const hash = await bcrypt.hash(senha, 10);

  await db.query("INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)", [
    nome,
    email,
    hash,
  ]);

  res.status(201).json({ message: "Usuario criado!" });
};

exports.login = async (req, res) => {
  const { nome, senha } = req.body;

  const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);

  if (!users.length)
    return res.status(404).json({ error: "Usuario não encontrado" });

  const user = users[0];

  const valid = await bcrypt.compare(senha, user.senha);
  if (!valid) return res.status(401).json({ error: "Senha inválida" });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  });

  res.json({token});
};
