const {z} = require('zod');

//Define as regras para a entrada do diário
const diarioSchema = z.object({
    usuario_id: z.number().positive('ID de usuario inválido'),
    data: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de data deve ser AAAA-MM-DD'),
    tipo: z.enum(['treino', 'dieta'], {errorMap: () => ({message: "Tipo deve ser 'treino' ou 'dieta'"}) }),
    descricao: z.string().min(3, "A descrição deve ter pelo menos 3 caracteres").max(255),
    calorias: z.number().nonnegative("Calorias não podem ser negativas").optional(),
});

module.exports = {diarioSchema};