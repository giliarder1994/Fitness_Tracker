const db = require('../config/db');

exports.create = async (req, res) => {
    const {nome} = req.body;

    await db.query(
        'INSERT INTO treinos (user_id, nome) VALUES (?, ?)',
        [req.userID, nome]
    );
    
    res.status(201).json({message: 'Treino criado'});
};

exports.getAll = async (req, res) => {
    const [treinos] = await db.query(
        'SELECT *FROM treinos WHERE user_id = ?',
        [req.userID]
    );

    res.json(treinos);
}