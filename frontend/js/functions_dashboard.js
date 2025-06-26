let ulListProducts = document.getElementById("list-products")

const getProductsApi = async() => {
    const data = await fetch("http://localhost:3000/products")
                        .then(response => response.json())

    return data.payload
}


const showProducts = async() => {

    const listProducts = await getProductsApi()
    const productViews = ""

    for (let i = 0; i < listProducts.length; i++) {
        const product = listProducts[i];
        productViews += `<li class="style-products">
            <div class = "image-box">
            <img src="${product.imagen}" alt="[!] Img product">          
            </div>
            <h3>${product.id}</h3>
            <h3>${product.nombre}</h3>
            <p>$${product.precio}</p>
        </li>`
        
    }

    ulListProducts.innerHTML = productViews
}

function init() {
    
}

