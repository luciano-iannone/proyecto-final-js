document.addEventListener('DOMContentLoaded', () => {
    const botonesAgregarAlCarrito = document.querySelectorAll('button[type="button"]');
    const botonCarrito = document.querySelector('.carritoCompras');
    const botonCerrarCarrito = document.querySelector('#btnCerrarCarrito');
    const cartOverlay = document.querySelector('#cart-overlay');
    const cartItemsContainer = document.querySelector('#cart-items-container');
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
        const cartItemsList = document.createElement('ul');
        cartItemsList.id = 'cart-items-list';
        carrito.forEach((item, index) => {
            const cartItem = document.createElement('li');
            cartItem.innerHTML = `
          <img src="${item.imagen}" alt="${item.nombre}">
          <span>${item.nombre} - $${item.precio.toFixed(2)} x ${item.cantidad}</span>
          <button class="btnEliminar" data-index="${index}">Eliminar</button>
        `;
            cartItemsList.appendChild(cartItem);
        });

        cartItemsContainer.innerHTML = '';
        cartItemsContainer.appendChild(cartItemsList);

        const btnEliminar = document.querySelectorAll('.btnEliminar');
        btnEliminar.forEach(btn => {
            btn.addEventListener('click', e => eliminarDelCarrito(e));
        });
    }

    function guardarCarritoEnLocalStorage() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function eliminarDelCarrito(event) {
        const index = event.target.dataset.index;
        carrito.splice(index, 1);
        actualizarInterfazCarrito();
        guardarCarritoEnLocalStorage();
    }

    function toggleCarritoOverlay() {
        cartOverlay.classList.toggle('active');
    }

    botonCarrito.addEventListener('click', toggleCarritoOverlay);
    botonCerrarCarrito.addEventListener('click', toggleCarritoOverlay);

    actualizarInterfazCarrito();
});