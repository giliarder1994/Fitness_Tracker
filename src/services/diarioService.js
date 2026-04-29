const db = require('../config/db');

exports.getResumo = async (userId) => {
  const [result] = await db.query(`
    SELECT 
      SUM(a.proteina * d.quantidade / 100) as proteina,
      SUM(a.carbo * d.quantidade / 100) as carbo,
      SUM(a.gordura * d.quantidade / 100) as gordura,
      SUM(a.calorias_base * d.quantidade / 100) as calorias
    FROM diario_alimentar d
    JOIN alimentos a ON a.id = d.alimento_id
    WHERE d.user_id = ? AND DATE(d.data) = CURDATE()
  `, [userId]);

  return result[0];
};