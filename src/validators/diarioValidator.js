const {z} = require('zod');

//Define as regras para a entrada do diário
const diarioSchema = z.object({
    alimento_id: z.number().positive(),
    quantidade: z.number().positive(),
    data: z.string().optional()
});

const treinoSchema = z.object({
    exercicio_id: z.number().positive(),
    series: z.number().int().positive(),
    repeticoes: z.number().int().positive(),
    carga: z.number().nonnegative(),
    data: z.string().optional()
});

module.exports = {diarioSchema, treinoSchema};