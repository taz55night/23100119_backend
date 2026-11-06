const db = require('../config/database');

async function registrarPedido(datos) {
    const query = 'INSERT INTO pedidos (nombre, correo, producto, cantidad, para_llevar, tamano, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?)';
    
    const [resultado] = await db.execute(query, [
        datos.nombre || null,
        datos.correo || null,
        datos.producto || null,
        datos.cantidad || 1,
        datos.para_llevar || 'No',
        datos.tamano || null,
        datos.observaciones || 'Ninguna'
    ]);
    
    return resultado;
}

module.exports = { registrarPedido };