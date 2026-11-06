const pedidoModel = require('../models/pedidoModel');

async function registrarPedido(req, res) {
    try {
        const datos = req.body;
        await pedidoModel.registrarPedido(datos);
        return res.status(200).json({ mensaje: "Pedido registrado con éxito" });
    } catch (error) {
        console.error("Error al crear el pedido:", error);
        return res.status(500).json({ error: "Error al crear el pedido" });
    }
}

module.exports = { registrarPedido };