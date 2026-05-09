exports.validarCriacao = (req, res, next) => {
    const { nome, grupo_muscular, exercicios } = req.body;

    if (!nome || typeof nome !== 'string' || nome.trim().length === 0) {
        return res.status(400).json({ error: 'O nome do treino é obrigatório.' });
    }

    if (!grupo_muscular || typeof grupo_muscular !== 'string' || grupo_muscular.trim().length === 0) {
        return res.status(400).json({ error: 'O grupo muscular é obrigatório.' });
    }

    if (!exercicios || !Array.isArray(exercicios) || exercicios.length === 0) {
        return res.status(400).json({ error: 'O treino deve ter pelo menos um exercício.' });
    }

    for (const ex of exercicios) {
        if (!ex.nome || !ex.series || !ex.repeticoes) {
            return res.status(400).json({ error: 'Cada exercício deve ter nome, séries e repetições.' });
        }
        if (typeof ex.series !== 'number' || typeof ex.repeticoes !== 'number') {
            return res.status(400).json({ error: 'Séries e repetições devem ser números.' });
        }
    }

    next();
};
