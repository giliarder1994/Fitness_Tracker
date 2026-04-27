const express = require('express');
const app = express();

app.use(express.json());

app.use('/auth', require('./routes/authRoutes'));
app.use('/diario', require('./routes/diarioRoutes'));
app.use('/treinos', require('./routes/treinoRoutes'));

module.exports = app;
