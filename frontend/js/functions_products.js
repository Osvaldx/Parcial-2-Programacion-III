/////////////////////////
// VARIABLES GLOBALS //
////////////////////////
let skateListElement = document.getElementById("list-skate");
let rollerListElement = document.getElementById("list-rollers");
let cardSkate = document.getElementById("go-skates")
let productSkate = document.getElementById("products-skates")
let cardRollers = document.getElementById("go-rollers")
let productRoller = document.getElementById("products-roller")


///////////////
// EVENTS //
///////////////

cardSkate.addEventListener("click", function() {
    productSkate.scrollIntoView({behavior:'smooth' });
    
});

cardRollers.addEventListener("click", function() {
    productRoller.scrollIntoView({behavior: 'smooth'})
    
})


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