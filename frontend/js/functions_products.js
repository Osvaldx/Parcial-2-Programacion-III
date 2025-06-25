/////////////////////////
// VARIABLES GLOBALS //
////////////////////////
let skateListElement = document.getElementById("list-skate");
let rollerListElement = document.getElementById("list-rollers");


///////////////
// FUNCTIONS //
///////////////
const getProductsAPI = async () => {
    let response = await fetch("http://localhost:3000/products");
    let data = await response.json();

    return data;
}

const generateListProducts = async (typeProduct) => {
    let listProduct = [];
    let allProducts = await getProductsAPI();

    allProducts['payload'].forEach(product => {
        if(product['categoria'] === typeProduct) {
            listProduct.push(product);
        }
    });

    return listProduct
}

const showProduct = (ElementShow, productList) => {
    let productsViews = "";
    
    for(let i = 0; i < productList.length; i++) {
        let product = productList[i];
        productsViews += `
        <li class="style-products">
            <div class = "image-box">
            <img src="${product.imagen}" alt="[!] Img product">          
            </div>
            <h3>${product.nombre}</h3>
            <p>$${product.precio}</p>
            <button>Agregar al carrito</button>
        </li>`
    }

    ElementShow.innerHTML = productsViews;
}

const showAllProducts = async () => {
    let skateProductList = await generateListProducts("SKATE");
    // let rollerProductList = generateListProducts("ROLLER");

    showProduct(skateListElement, skateProductList);
    let rollerProductList = await generateListProducts("ROLLER");

    showProduct(rollerListElement, rollerProductList);
}

const Init = () => {
    showAllProducts();
}

Init()