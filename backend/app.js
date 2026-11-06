const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const pedidoRoutes = require('./routes/pedidoRutas');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static(path.join(__dirname, '../frontend')));

app.use('/', pedidoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});