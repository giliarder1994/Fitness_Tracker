const diarioService = require('../services/diarioService');

exports.getResumoDiario = async (req, res) => {
    try {
        const resumo = await diarioService.getResumo(req.user.id);
        res.status(200).json(resumo || { message: "Sem registros hoje" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.adicionarConsumo = async (req, res) => {
    try {
        const dados = { ...req.body, user_id: req.user.id };
        const resultado = await diarioService.registrarAlimento(dados);
        res.status(201).json({ message: "Consumo registrado!", id: resultado.insertId });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.adicionarTreino = async (req, res) => {
    try {
        const dados = { ...req.body, user_id: req.user.id };
        const resultado = await diarioService.registrarTreino(dados);
        res.status(201).json({ message: "Série de treino registrada!", id: resultado.insertId });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.listarTreinoHoje = async (req, res) => {
    try {
        const treino = await diarioService.getTreinoHoje(req.user.id);
        res.status(200).json(treino);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};