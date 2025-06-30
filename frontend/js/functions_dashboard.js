let ulListProducts = document.getElementById("list-products")

const getProductsApi = async() => {
    const data = await fetch("http://localhost:3000/api/products")
                        .then(response => response.json())

    return data.payload
}


const showProducts = async() => {
    const listProducts = await getProductsApi()
    let productViews = ""

    for (let i = 0; i < listProducts.length; i++) {
        const product = listProducts[i];
        let allow = (product.activo) ? "SI" : "NO"; 

        productViews += `<li class="card-product">
                    <div class="img-box">
                        <img src="${product.imagen}" alt="">
                    </div>
                    <h3>ID: ${product.id_product}</h3>
                    <h4>${product.nombre}</h4>
                    <p>$${product.precio}</p>
                    <p>ACTIVO: <strong>${allow}</strong></p>
                </li>`
    }

    ulListProducts.innerHTML = productViews;
}

function init() {
    showProducts();
}

init();