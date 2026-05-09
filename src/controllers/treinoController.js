const treinoService = require('../services/treinoService');

exports.criarTreino = async (req, res) => {
    try {
        const novoTreino = await treinoService.salvarTreino(req.userId, req.body);
        res.status(201).json(novoTreino);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar treino.' });
    }
};

exports.listarTreinos = async (req, res) => {
    try {
        const treinos = await treinoService.buscarTodos(req.userId);
        res.json(treinos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar treinos.' });
    }
};

exports.buscarPorId = async (req, res) => {
    try {
        const treino = await treinoService.buscarPorId(req.userId, req.params.id);
        if (!treino) return res.status(404).json({ error: 'Treino não encontrado.' });
        res.json(treino);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar treino.' });
    }
};

exports.deletarTreino = async (req, res) => {
    try {
        await treinoService.remover(req.userId, req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message || 'Erro ao deletar treino.' });
    }
};
