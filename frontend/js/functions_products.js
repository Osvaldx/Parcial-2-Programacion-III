/////////////////////////
// VARIABLES GLOBALS //
////////////////////////
let skateListElement = document.getElementById("list");
let rollerListElement;


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
            <img src="${product.imagen}" alt="[!] Img product">
            <h3>${product.nombre}</h3>
            <p>$${product.precio}</p>
        </li>`
    }

    ElementShow.innerHTML = productsViews;
}

const showAllProducts = async () => {
    let skateProductList = await generateListProducts("SKATE");
    // let rollerProductList = generateListProducts("ROLLER");

    showProduct(skateListElement, skateProductList);
}

const Init = () => {
    showAllProducts();
}

Init()