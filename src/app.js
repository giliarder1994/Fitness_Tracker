const express = require('express');
const app = express();
const diarioRoutes = require("./routes/diarioRoutes");

app.use(express.json());

app.use('/auth', require('./routes/authRoutes'));
app.use('/api/diario', diarioRoutes);



module.exports = app;
