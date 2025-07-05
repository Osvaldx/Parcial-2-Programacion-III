import { parametersValidation } from "/js/parametersValidations.js";

// Variables
const ElementFormSearch = document.getElementById("form-addProduct");
const listProduct = document.getElementById("list-products")


// Funciones

let addProductAPI = async(product) => {
    let response = await fetch("http://localhost:3000/api/products/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
    })
    
    return response
}


const showResultsAddProduct = async(event) => {
    let cardProduct = ""
    event.preventDefault(); // Evita que la pagina se recargue al enviar el form
    
    let formData = new FormData(event.target); // Lee los datos del form y los devuelve
    let data = Object.fromEntries(formData.entries()); // Convierte el FormData a objeto js
    
    let activo = (data.activeProduct == "si") ? true : false
    let result = parametersValidation(data.nameProduct, data.imageProduct, data.priceProduct, data.categoryProduct.toUpperCase(), activo)
    
    
    if(result.allow){
        let product = {
                "nombre": data.nameProduct,
                "imagen": data.imageProduct,
                "precio": data.priceProduct,
                "categoria": data.categoryProduct,
                "activo": activo
        }

        let response = await addProductAPI(product)
        if ((await response).ok) {
            cardProduct += `<p>El producto fue agregado con exito</p>`;
        }else{
            cardProduct += `<p>ERROR AL AGREGAR UN PRODUCTO!</p>`;
        }
    }else{
        cardProduct += `<p>${result.message}</p>`
    }

    listProduct.innerHTML = cardProduct
}

// EVENTOS
ElementFormSearch.addEventListener("submit", showResultsAddProduct);