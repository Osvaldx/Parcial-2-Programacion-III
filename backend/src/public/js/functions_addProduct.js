import { parametersValidation } from "../../../src/public/js/parametersValidations";

// Variables
const ElementFormSearch = document.getElementById("form-addProduct");
const listProduct = document.getElementById("list-products")


// Funciones

const addProduct = async(event) => {
    let cardProduct = ""
    event.preventDefault(); // Evita que la pagina se recargue al enviar el form

    let formData = new FormData(event.target); // Lee los datos del form y los devuelve
    let data = Object.fromEntries(formData.entries()); // Convierte el FormData a objeto js

    let activo = (data.activeProduct == "si") ? true : false
    let result = parametersValidation(data.nameProduct, data.imageProduct, data.priceProduct, data.categoryProduct.toUpperCase(), activo)


    if(result.allow){
        cardProduct += `<li class="card-product">
                <div class="img-box">
                    <img src="${data.imageProduct}" alt="">
                </div>
                <h4>${data.nameProduct}</h4>
                <p>$${data.priceProduct}</p>
                <p>${data.categoryProduct}</p>
                <p>ACTIVO: <strong>${activo}</strong></p>
            </li>`;
    }else{
        cardProduct += `<p>${result.message}</p>`
    }

    listProduct.innerHTML = cardProduct
    console.log(data)


}

// EVENTOS
ElementFormSearch.addEventListener("submit", addProduct);

// INICIALIZADOR
const Init = () => {
}

Init();