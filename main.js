document.addEventListener('DOMContentLoaded', () => {
    const botonesAgregarAlCarrito = document.querySelectorAll('button[type="button"]');
    const botonCarrito = document.querySelector('.carritoCompras');
    const botonVaciarCarrito = document.querySelector('.vaciar-carrito');
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

        Swal.fire({
            icon: 'success',
            title: '¡Producto Agregado!',
            text: `${selectedItem.nombre} se ha agregado al carrito.`,
            confirmButtonText: 'Aceptar'
        });
    }

    function vaciarCarrito() {
        carrito = [];
        actualizarInterfazCarrito();
        guardarCarritoEnLocalStorage();

        Swal.fire({
            icon: 'warning',
            title: 'Carrito Vacío',
            text: 'El carrito se ha vaciado.',
            confirmButtonText: 'Aceptar'
        });
    }

    botonVaciarCarrito.addEventListener('click', () => {
        vaciarCarrito();
    });

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
        const contenidoHTML = carrito.map(item => `
            <div>
                <strong>Nombre:</strong> ${item.nombre} <br>
                <strong>Cantidad:</strong> ${item.cantidad} <br>
                <strong>Total:</strong> $${(item.precio * item.cantidad).toFixed(2)}
            </div>
            <hr>
        `).join('');
    
        Swal.fire({
            icon: 'info',
            title: 'Carrito de Compras',
            html: contenidoHTML,
            confirmButtonText: 'Cerrar'
        });
    });

    actualizarInterfazCarrito();
});