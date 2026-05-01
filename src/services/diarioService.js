const db = require('../config/db');


exports.getResumo = async (userId) => {
    
    const [result] = await db.query(`
        SELECT
            SUM(a.proteina * d.quantidade / 100) as proteinas,
            SUM(a.carbo * d.quantidade /100) as carbo,
            SUM(a.gordura * d.quantidade / 100) as gordura,
            SUM(a.fibras * d.quantidade / 100) as fibras,
            SUM(a.calorias_base * d.quantidade / 100) as calorias
        FROM diario_alimentar d
        JOIN alimentos a ON a.id = d.alimento_id
        WHERE d.user_id = ? AND DATE(d.data) = CURDATE()
    `, [userId]);

    return result[0];
};

exports.registrarAlimento = async(dados) => {
    
    const {user_id, alimento_id, quantidade, data} = dados;

    const [result] = await db.query(
        'INSERT INTO diario_alimentar (user_id, alimento_id, quantidade, data) VALUES (?, ?, ?, ?)', 
        [user_id, alimento_id, quantidade, data || new Date()]
    );

    return result;
}

exports.registrarAlimento = async (dados) => {
    const {user_id, alimento_id, quantidade, data} = dados;
    const [result] = await db.query(
        'INSERT INTO diario_alimentar (user_id, alimento_id, quantidade, data) VALUES (?, ?, ?, ?)',
        [user_id, alimento_id, quantidade, data || new Date()]
    );

    return result;
};

exports.registrarTreino = async (dados) => {
    const { user_id, exercicio_id, series, repeticoes, carga } = dados;
    const [result] = await db.query(
        'INSERT INTO diario_treino (user_id, exercicio_id, series, repeticoes, carga) VALUES (?, ?, ?, ?, ?)',
        [user_id, exercicio_id, series, repeticoes, carga]
    );
    return result;
};

exports.getTreinoHoje = async (userId) => {
    const [rows] = await db.query(`
        SELECT e.nome as exercicio, e.categoria, dt.series, dt.repeticoes, dt.carga
        FROM diario_treino dt
        JOIN exercicios e ON e.id = dt.exercicio_id
        WHERE dt.user_id = ? AND DATE(dt.data) = CURDATE()
    `, [userId]);
    return rows;
};