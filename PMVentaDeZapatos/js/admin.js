const API_URL = 'https://retoolapi.dev/bz0QQe/data';
/*API de la imagen*/
const IMG_API_URL = 'https://api.imgbb.com/1/upload?key=05acc433e8f2a239ce17dec2dad7f707';
const tbody = document.getElementById('products-tbody');
const modal = document.getElementById("medAdd");
const btnAgregar = document.getElementById("btnAgregar");
const btnCerrar = document.getElementById("btn-Cerrar");
const imagenFileEl = document.getElementById('imagen-file'); // Input de archivo (imagen)
const imagenUrlEl = document.getElementById('imagen-url'); // Campo oculto con URL de la imagen

// Mostrar los productos en la tabla
function LoadTable(products) {
    tbody.innerHTML = '';
    products.forEach(product => {
        tbody.innerHTML += `
            <tr>
                <td>${product.id}</td>
                <td><img src="${product.imagen}" alt="Foto de ${product.productos}" width="50"></td>
                <td>${product.productos}</td>
                <td>${product.categoria}</td>
                <td>${product.estilo}</td>
                <td>${product.marca}</td>
                <td>${product.talla}</td>
                <td>${product.stock}</td>
                <td>${product.precio}</td>
                <td>
                    <button onclick="EditarProducto('${product.id}')" class="btn-Button">Editar</button>
                    <button onclick="EliminarProductos('${product.id}')" class="btn-Button">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

// Obtener registros desde la API
async function ObtenerRegistros() {
    const res = await fetch(API_URL);
    const data = await res.json();
    LoadTable(data);
}

// Cargar datos al iniciar
window.addEventListener('DOMContentLoaded', ObtenerRegistros);

// Mostrar y cerrar modal
btnAgregar.addEventListener("click", () => {
    modal.showModal();
});
btnCerrar.addEventListener("click", () => {
    modal.close(); // Correcto: .close()
});

// Agregar nuevo producto
document.getElementById("frmAddPro").addEventListener("submit", async e => {
    e.preventDefault();

    // Capturar los valores del formulario
    const productos = document.getElementById("txtName").value.trim();
    const categoria = document.getElementById("txtTypes").value.trim();
    const estilo = document.getElementById("txtStyles").value.trim();
    const marca = document.getElementById("txtCompany").value.trim();
    const talla = document.getElementById("txtSize").value.trim();
    const stock = document.getElementById("txtStock").value.trim();
    const precio = document.getElementById("txtPrice").value.trim();

    async function subirImagen(file) {
    const fd = new FormData();
    fd.append('image', file);
    const res = await fetch(IMG_API_URL, {method: 'POST', body: fd});
    const obj = await res.json();
    return obj.data.url;
}
//Se obtiene la URL de la imagen en caso de que el registro la tuviera desde antes
    let imageUrl = imagenUrlEl.value;
    if(imagenFileEl.files.length > 0){
        imageUrl = await subirImagen(imagenFileEl.files[0]);
    }
     const payload = {
        imagen : imageUrl
    };

    // Validación básica
    if (!productos || !categoria || !estilo || !marca || !talla || !stock || !precio) {
        alert("Complete todos los campos");
        return;
    }

    // Enviar a la API
    const respuesta = await fetch(API_URL, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ productos, categoria, estilo, marca, talla, stock, precio}, payload)
    });

    if (respuesta.ok) {
        alert("Producto agregado correctamente");
        document.getElementById("frmAddPro").reset();
        alert(6)
        modal.close();
        ObtenerRegistros();
    } else {
        alert("Error al agregar el producto");
    }
});

// Eliminar producto
async function EliminarProductos(id) {
    const confirmacion = confirm("¿Quieres eliminar el producto?");
    if (confirmacion) {
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });
        ObtenerRegistros();
    }
}