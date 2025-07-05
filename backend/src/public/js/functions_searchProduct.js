// VARIABLES GLOBALES
const ElementListProducts = document.getElementById("list-products");
const ElementFormSearch = document.getElementById("form-searchProduct");
const ElementInputForm = document.getElementById("input-id-form");


// FUNCIONES
export const getProductID = async(idProduct) => {
    let data = await fetch(`http://localhost:3000/api/products/${idProduct}`)
    .then(response => response.json())
    
    return data;
}

export const changeColorInput = (input) => {
    input.style.color = "#cc4343";
    input.style.borderBlockColor = "#cc4343";
    alert("[!] ERROR. Porfavor Ingrese un numero")
    setTimeout(() => {
        input.style.color = "black";
        input.style.borderBlockColor = "rgb(107, 107, 107)";
    }, 2000);
}

export const validateID = (idProduct) => {
    const regEx = new RegExp("^[0-9]+$")
    return regEx.test(idProduct);
}

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
    
    if(query.payload.length > 0){
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
                <p>ACTIVO: <strong>${activo}</strong></p>
            </li>`;
        }
    } else {
        cardProduct += `
            <li class="card-product">
                <h4>No existe un producto con ese ID</h4>
            </li>`;
    }
    
    ElementListProducts.innerHTML = cardProduct;
}

// EVENTOS
ElementFormSearch.addEventListener("submit", showProductHTML);