import { getProductID, changeColorInput, validateID } from "/js/functions_searchProduct.js";
import { parametersValidation } from "/js/parametersValidations.js";

// VARIABLES GLOBALES
const ElementListProducts = document.getElementById("list-products");
const ElementFormSearch = document.getElementById("form-searchProduct");
const ElementInputForm = document.getElementById("input-id-form");

// FUNCIONES
const showProductHTML = async(event) => {
    event.preventDefault();
    
    let formData = new FormData(event.target); // Lee los datos del form y los devuelve
    let data = Object.fromEntries(formData.entries()); // Convierte el FormData en objeto js
    
    if(!validateID(data.idProduct)) {
        changeColorInput(ElementInputForm);
        return
    }
    
    let query = await getProductID(data.idProduct);
    let cardProduct = "";
    let bandera = false
    
    if(query.payload.length > 0){
        bandera = true;
        let listProduct = query.payload;
        for(let i=0; i < listProduct.length; i++){
            let product = listProduct[i];
            let activo = (product.activo) ? "SI" : "NO";
            
            cardProduct += `
            <li class="card-product">
            <div class="img-box">
            <img src="${product.imagen}" alt="">
            </div>
            <h3>ID: ${product.id_product}</h3>
            <h4>${product.nombre}</h4>
            <p>$${product.precio}</p>
            <p>$${product.categoria}</p>
            <p>ACTIVO: <strong>${activo}</strong></p>
            <button id="btn-modifiedProduct" data-product='${JSON.stringify(product)}'>Modificar Producto</button>
            </li>`;
        }
    } else {
        cardProduct += `
        <li class="card-product">
        <h4>No existe un producto con ese ID</h4>
        </li>`;
    }
    
    ElementListProducts.innerHTML = cardProduct;
    if(bandera) {
        const buttonUpdate = document.getElementById("btn-modifiedProduct");
        buttonUpdate.addEventListener("click", showFormModified);
    }
}

const returnCheckedActive = (activo) => {
    let result = ""
    if(activo) {
        result = `
        <p id="title-form"><strong>SE MOSTRARA EN LA WEB?</strong></p>
        <div>
            <label for="activo" id="title-form">
            <input name="activo" type="radio" id="input-form" value="si" checked>SI
            </label>
        
            <label for="activo" id="title-form">
                <input name="activo" type="radio" id="input-form" value="no">NO
            </label>
        </div>
        `
    } else {
        result = `
        <p id="title-form"><strong>SE MOSTRARA EN LA WEB?</strong></p>
        <div>
            <label for="activo" id="title-form">
            <input name="activo" type="radio" id="input-form" value="si">SI
            </label>
        
            <label for="activo" id="title-form">
                <input name="activo" type="radio" id="input-form" value="no" checked>NO
            </label>
        </div>
        `
    }

    return result
}

const updateProductAPI = async (product) => {
    let response = await fetch("http://localhost:3000/api/products/update", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
    })

    return response
}

const addProduct = async (event) => {
    event.preventDefault();
    
    let formData = new FormData(event.target);
    let data = Object.fromEntries(formData.entries());
    let activo = (data.activo == "si") ? true : false

    let result = parametersValidation(data.nombre, data.imagen, data.precio, data.categoria, activo)
    if(result.allow) {
        let product = {
            "nombre": data.nombre,
            "imagen": data.imagen,
            "precio": data.precio,
            "categoria": data.categoria,
            "activo": activo,
            "id_product": data.id_product
        }

        let response = await updateProductAPI(product);
        if(response.ok) {
            alert(`[+] Producto ID: ${data.id_product} modificado con exito!`)
        } else {
            alert("[!] Ocurrio un error la respuesta al servidor")
        }
        
        ElementListProducts.innerHTML = "";
    } else {
        alert(result.message);
        showFormModified();
    }
}

const showFormModified = (event) => {
    const btn = event.currentTarget;
    let product = JSON.parse(btn.dataset.product);
    let cardProduct = `
        <form id="form-updateProduct">
            <label for="id_product" id="title-form"><strong>ID DEL PRODUCTO:</strong></label>
            <input name="id_product" type="text" id="input-form" value="${product.id_product}" readonly>    

            <label for="nombre" id="title-form"><strong>NOMBRE DEL PRODUCTO:</strong></label>
            <input name="nombre" type="text" id="input-form" value="${product.nombre}" placeholder="Ingrese el nombre del producto..." autocomplete="off">

            <label for="imagen" id="title-form"><strong>IMAGEN DEL PRODUCTO:</strong></label>
            <input name="imagen" type="text" id="input-form" value="${product.imagen}" placeholder="Ingrese la imagen del producto" autocomplete="off">

            <label for="precio" id="title-form"><strong>PRECIO DEL PRODUCTO:</strong></label>
            <input name="precio" type="number" id="input-form" value="${product.precio}" placeholder="Ingrese el precio del producto..." autocomplete="off">

            <label for="categoria" id="title-form"><strong>CATEGORIA DEL PRODUCTO:</strong></label>
            <input name="categoria" type="text" id="input-form" value="${product.categoria}" placeholder="Ingrese la categoria del producto..." autocomplete="off">
            
            ${returnCheckedActive(product.activo)}

            <button type="submit" id="btn-form">AGREGAR</button>
        </form>
    `;
    
    ElementListProducts.innerHTML = cardProduct;
    const ElementFormUpdate = document.getElementById("form-updateProduct");
    ElementFormUpdate.addEventListener("submit", addProduct);
}

// EVENTOS
ElementFormSearch.addEventListener("submit", showProductHTML);