const db = require('../config/db');

exports.salvarTreino = async (userId, dadosTreino) => {
    const { nome, grupo_muscular, exercicios } = dadosTreino;

    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        const [resultTreino] = await connection.execute(
            'INSERT INTO treinos (usuario_id, nome, grupo_muscular) VALUES (?, ?, ?)',
            [userId, nome, grupo_muscular]
        );
        const treinoId = resultTreino.insertId;

        for (const ex of exercicios) {
            await connection.execute(
                'INSERT INTO exercicios (treino_id, nome, series, repeticoes, carga) VALUES (?, ?, ?, ?, ?)',
                [treinoId, ex.nome, ex.series, ex.repeticoes, ex.carga || 0]
            );
        }

        await connection.commit();
        return { id: treinoId, message: 'Treino salvo com sucesso!' };
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};

exports.buscarTodos = async (userId) => {
    const [rows] = await db.execute(`
        SELECT 
            t.id AS treino_id,
            t.nome AS treino_nome,
            t.grupo_muscular,
            t.data_criacao,
            e.id AS exercicio_id,
            e.nome AS exercicio_nome,
            e.series,
            e.repeticoes,
            e.carga
        FROM treinos t
        LEFT JOIN exercicios e ON t.id = e.treino_id
        WHERE t.usuario_id = ?
        ORDER BY t.data_criacao DESC
    `, [userId]);

    // Agrupa exercícios por treino
    const treinosMap = new Map();
    for (const row of rows) {
        if (!treinosMap.has(row.treino_id)) {
            treinosMap.set(row.treino_id, {
                id: row.treino_id,
                nome: row.treino_nome,
                grupo_muscular: row.grupo_muscular,
                data_criacao: row.data_criacao,
                exercicios: []
            });
        }
        if (row.exercicio_id) {
            treinosMap.get(row.treino_id).exercicios.push({
                id: row.exercicio_id,
                nome: row.exercicio_nome,
                series: row.series,
                repeticoes: row.repeticoes,
                carga: row.carga
            });
        }
    }

    return Array.from(treinosMap.values());
};

exports.buscarPorId = async (userId, treinoId) => {
    const [rows] = await db.execute(`
        SELECT 
            t.id AS treino_id,
            t.nome AS treino_nome,
            t.grupo_muscular,
            t.data_criacao,
            e.id AS exercicio_id,
            e.nome AS exercicio_nome,
            e.series,
            e.repeticoes,
            e.carga
        FROM treinos t
        LEFT JOIN exercicios e ON t.id = e.treino_id
        WHERE t.usuario_id = ? AND t.id = ?
    `, [userId, treinoId]);

    if (!rows.length) return null;

    const treino = {
        id: rows[0].treino_id,
        nome: rows[0].treino_nome,
        grupo_muscular: rows[0].grupo_muscular,
        data_criacao: rows[0].data_criacao,
        exercicios: []
    };

    for (const row of rows) {
        if (row.exercicio_id) {
            treino.exercicios.push({
                id: row.exercicio_id,
                nome: row.exercicio_nome,
                series: row.series,
                repeticoes: row.repeticoes,
                carga: row.carga
            });
        }
    }

    return treino;
};

exports.remover = async (userId, treinoId) => {
    const [result] = await db.execute(
        'DELETE FROM treinos WHERE id = ? AND usuario_id = ?',
        [treinoId, userId]
    );

    if (result.affectedRows === 0) {
        throw { status: 404, message: 'Treino não encontrado.' };
    }

    return true;
};
