// VARIABLES GLOBALES
const ElementListProducts = document.getElementById("list-products");
const ElementFormSearch = document.getElementById("form-searchProduct");


// FUNCIONES
const getProductID = async(idProduct) => {
    let data = await fetch(`http://localhost:3000/api/products/${idProduct}`)
    .then(response => response.json())
    console.log(data);
    
    return data;
}

const showProductHTML = async(event) => {
    event.preventDefault();

    let formData = new FormData(event.target);
    let data = Object.fromEntries(formData.entries());
    let query = await getProductID(data.idProduct);
    let cardProduct = "";
    
    if(query.payload.length > 0){
        console.log("HOLA")
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

// INICIALIZADOR
const Init = () => {
}

Init();