const db = require('../config/db');
const diarioService = require('../services/diarioService');

exports.create = async (req, res) => {
    const {alimento_id, quantidade} = req.body;

    await db.query(
        'INSERT INTO diario_alimentar (user_id, alimento_id, quantidade, data) VALUES (?, ?, ?, NOW())', 
        [req.userId, alimento_id, quantidade]
    );

    res.status(201).json({message: 'Registro criado!'});
};

exports.resumo = async (req, res) => {
    const resumo = await diarioService.getResumo(req.userId);
    res.json(resumo);
}