const db = require('../config/db');
const {diarioSchema} = require("../validators/diarioValidator");


exports.getResumo = async (userId) => {
    //Validação simples do ID antes da query
    if(!userId || isNaN(userId)) {
        throw {status: 400, message: "ID de usuário inválido para a consulta"};
    }

    const [result] = await db.query(`
        SELECT
            SUM(a.proteina * d.quantidade / 100) as proteinas,
            SUM(a.carbo * d.quantidade /100) as carbo,
            SUM(a.gordura * d.quantidade / 100) as gordura,
            SUM(a.calorias_base * d.quantidade / 100) as calorias
        FROM diario_alimentar d
        JOIN alimentos a ON a.id = d.alimento_id
        WHERE d.user_id = ? AND DATE(d.data) = CURDATE()
    `, [userId]);

    return result[0];
};

exports.registrarAlimento = async(dados) => {
    //Aplica a validação do zod
    const validacao = diarioSchema.safeParse(dados);

    if(!validacao.success) {
        throw {
            status: 400,
            detalhes: validacao.error.flatten().fieldErrors
        };
    }

    const {user_id, alimento_id, quantidade, data} = validacao.data;

    const [result] = await db.query(
        'INSERT INTO diario_alimentar (user_id, alimento_id, quantidade, data) VALUES (?, ?, ?, ?)', 
        [user_id, alimento_id, quantidade, data || new Date()]
    );

    return result;
}