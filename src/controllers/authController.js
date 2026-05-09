const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({ error: 'Nome, email e senha são obrigatórios.' });
        }

        const [existente] = await db.query('SELECT id FROM usuarios WHERE email = ?', [email]);
        if (existente.length > 0) {
            return res.status(409).json({ error: 'Email já cadastrado.' });
        }

        const hash = await bcrypt.hash(senha, 10);
        await db.query('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', [nome, email, hash]);

        res.status(201).json({ message: 'Usuário criado com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar usuário.' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
        }

        const [users] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (!users.length) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        const user = users[0];
        const valid = await bcrypt.compare(senha, user.senha);
        if (!valid) return res.status(401).json({ error: 'Senha inválida.' });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao realizar login.' });
    }
};
