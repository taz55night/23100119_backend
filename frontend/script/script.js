document.addEventListener('DOMContentLoaded', () => {
    let cantidad = 1;

    const numeroSpan = document.getElementById('numero');
    const btnRestar = document.getElementById('btn-restar');
    const btnSumar = document.getElementById('btn-sumar');
    const cantidadInput = document.getElementById('cantidad-input');
    const formulario = document.getElementById('formulario-pedido');
    const btnLimpiar = document.getElementById('btn-limpiar');

    function actualizarCantidad() {
        if (numeroSpan) numeroSpan.textContent = cantidad;
        if (cantidadInput) cantidadInput.value = cantidad;
    }

    if (btnSumar) {
        btnSumar.addEventListener('click', () => {
            cantidad++;
            actualizarCantidad();
        });
    }

    if (btnRestar) {
        btnRestar.addEventListener('click', () => {
            if (cantidad > 1) {
                cantidad--;
                actualizarCantidad();
            }
        });
    }

    if (formulario) {
        formulario.addEventListener('submit', async (event) => {
            event.preventDefault(); // Evita la recarga tradicional y el comportamiento por defecto

            const nombre = document.getElementById('nombre').value;
            const correo = document.getElementById('correo').value;
            const producto = document.getElementById('producto').value;
            const tamanoSeleccionado = document.querySelector('input[name="tamano"]:checked');
            const paraLlevar = document.getElementById('para-llevar').checked ? 'Sí' : 'No';
            const observaciones = document.getElementById('observaciones').value;
            const tamano = tamanoSeleccionado ? tamanoSeleccionado.value : 'No seleccionado';

            const datosPedido = {
                nombre,
                correo,
                producto,
                cantidad,
                para_llevar: paraLlevar,
                tamano,
                observaciones: observaciones || 'Ninguna'
            };

            try {
                // Envía los datos al servidor mediante POST asíncrono
                const respuesta = await fetch('/registrar', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(datosPedido)
                });

                if (respuesta.ok) {
                    // Si se guardó con éxito en MySQL, arma los parámetros y cambia al HTML de resumen
                    const parametros = new URLSearchParams(datosPedido);
                    window.location.href = `resumen.html?${parametros.toString()}`;
                } else {
                    alert('Hubo un error al guardar el pedido en la base de datos.');
                }
            } catch (error) {
                console.error('Error de red:', error);
                alert('No se pudo conectar con el servidor.');
            }
        });
    }

    if (btnLimpiar) {
        btnLimpiar.addEventListener('click', () => {
            cantidad = 1;
            actualizarCantidad();
        });
    }
});