const diarioService = require("../services/diarioService");

exports.getResumoDiario = async (req, res) => {
    try {
        const userId = req.user.id;
        const resumo = await diarioService.getResumo(userId);

        res.status(200).json(resumo || {message: "Nenhum registro hoje"});
    } catch(error) {
        res.status(error.status || 500).json({error: error.message});
    }
};

exports.adicionarConsumo = async (req, res) => {
    try {
        const dados = { ... req.body, user_id: req.user.id};
        const resultado = await diarioService.registrarAlimento(dados);

        res.status(201).json({message: "Consumo registrado!", id: resultado.insertId});
    } catch (error) {
        res.status(error.status || 400).json(error.detalhes || {error: error.message});
    }
};