//API 
const API_URL = 'https://retoolapi.dev/0RGJSS/data';
//EndPoint img
/*const IMG_API_URL = '';*/


const tbody = document.getElementById('products-tbody');
async function LoadProducts() {
    const res = await fetch(API_URL);
    const data = await res.json();
    LoadTable(data);
}

/*Función para cargar tabla*/

function LoadTable(products){

    tbody.innerHTML='';
    products.forEach(products => {
        tbody.innerHTML += `
            <tr>
            <td><img src = "${products.imagen} alt = "Foto de ${products.productos}>/<td>
            <td>${products.productos}</td>
            <td>${products.categoria}</td>
            <td>${products.estilo}</td>
            <td>${products.talla}</td>
            <td>${products.stock}</td>
            <td>${products.precio}</td>
            <td>
            <button onclick = "('${products.id}')">Editar</button>
        <button onclick = "('${products.id}')">Eliminar</button>
            </tr>
            `;
    });
}
LoadProducts();
window.addEventListener('DOMContentLoaded', LoadProducts);