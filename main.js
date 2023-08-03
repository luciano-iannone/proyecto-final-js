document.addEventListener('DOMContentLoaded', () => {
    const botonesAgregarAlCarrito = document.querySelectorAll('button[type="button"]');
    const botonCarrito = document.querySelector('.carritoCompras');
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    botonesAgregarAlCarrito.forEach((boton, index) => {
        boton.addEventListener('click', () => agregarAlCarrito(index));
    });

    function agregarAlCarrito(index) {
        const selectedItem = {
            imagen: document.querySelectorAll('.destacados img')[index].src,
            nombre: document.querySelectorAll('.destacados h2')[index].textContent,
            precio: obtenerPrecio(index),
            cantidad: 1,
        };

    function vaciarCarrito() {
    carrito = [];
    actualizarInterfazCarrito();
    guardarCarritoEnLocalStorage();
}


document.addEventListener('click', event => {
    if (event.target.classList.contains('vaciar-carrito')) {
        vaciarCarrito();
    }
});
        const indiceProductoExistente = carrito.findIndex(item => item.nombre === selectedItem.nombre);

        if (indiceProductoExistente !== -1) {
            carrito[indiceProductoExistente].cantidad++;
        } else {
            carrito.push(selectedItem);
        }

        actualizarInterfazCarrito();
        guardarCarritoEnLocalStorage();
    }

    function obtenerPrecio(index) {
        const preciosMouses = [5600, 5500, 6600, 7600, 6300, 4100];
        return preciosMouses[index] || 0;
    }

    function actualizarInterfazCarrito() {
        const listaCarrito = document.createElement('ul');
        carrito.forEach(item => {
            const elementoLista = document.createElement('li');
            elementoLista.innerHTML = `
            <img src="${item.imagen}" alt="${item.nombre}">
            <span>${item.nombre} - $${item.precio.toFixed(2)} x ${item.cantidad}</span>
        `;
            listaCarrito.appendChild(elementoLista);
        });

        const contenedorCarrito = document.querySelector('.carritoCompras');
        contenedorCarrito.innerHTML = '';
        contenedorCarrito.appendChild(listaCarrito);
    }

    function guardarCarritoEnLocalStorage() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    botonCarrito.addEventListener('click', () => {
        alert('Carrito de Compras:\n\n' + JSON.stringify(carrito, null, 2));
    });

    // Actualizar la interfaz del carrito al cargar la página
    actualizarInterfazCarrito();
});