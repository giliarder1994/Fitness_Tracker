const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const treinoRoutes = require('./routes/treinoRoutes');

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/treinos', treinoRoutes);

module.exports = app;
