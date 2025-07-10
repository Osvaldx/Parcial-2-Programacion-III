/////////////////////////
// VARIABLES GLOBALS //
////////////////////////
let skateListElement = document.getElementById("list-skate");
let rollerListElement = document.getElementById("list-rollers");
let cardSkate = document.getElementById("go-skates")
let productSkate = document.getElementById("products-skates")
let cardRollers = document.getElementById("go-rollers")
let productRoller = document.getElementById("products-roller")
let welcomeUser = document.getElementById("welcome-user")
let cart = []
let quantity = 0
let allProducts = [];

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

// agregar carrito

const addCart = async(id) => {
    let product = allProducts.find(product => product.id_product === id)
    let productCart = cart.find(p => p.id_product === id)
    if (productCart) {
        productCart.quantity += 1
    }else{
        product.quantity = 1;
        cart.push(product)
    }
    sessionStorage.setItem("cart", JSON.stringify(cart))
}

const getProductsAPI = async () => {
    let response = await fetch("http://localhost:3000/api/products");
    let data = await response.json();

    return data;
}

const getProducts = async () => {
    try {
        const data = await getProductsAPI();
        allProducts = data.payload; // agarramos solo la lista
    } catch (error) {
        console.log(`[ERROR]: ${error}`)
        allProducts = [];
    }
}

const generateListProducts = async (typeProduct) => {
    let listProduct = [];

    allProducts.forEach(product => {
        if(product['categoria'] === typeProduct) {
            listProduct.push(product);
        }
    });

    return listProduct
}

const showProduct = (ElementShow, productList) => {
    let productsViews = "";
    if(productList.length > 0) {
        for(let i = 0; i < productList.length; i++) {
            let product = productList[i];
            if(product.activo) {
                productsViews += `
                <li class="style-products">
                    <div class = "image-box">
                    <img src="${product.imagen}" alt="[!] Img product">          
                    </div>
                    <h3>${product.nombre}</h3>
                    <p>$${product.precio}</p>
                    <button onclick="addCart(${product.id_product})">Agregar al carrito</button>
                </li>`
            }
        }
    } else {
        productsViews += "<h3>No hay productos disponibles</h3>"
    }
    
    ElementShow.innerHTML = productsViews;
}

const showAllProducts = async () => {
    let skateProductList = [];
    let rollerProductList = [];

    if(allProducts.length > 0) {
        skateProductList = await generateListProducts("SKATE");
        rollerProductList = await generateListProducts("ROLLER");
    }

    showProduct(skateListElement, skateProductList);
    showProduct(rollerListElement, rollerProductList);
}

const validateUsername = () => {
    let username = sessionStorage.getItem("username");
    if(!username) { // Nan, Undefined, "", Empty
        window.location.href = "../../index.html"
    }else{
        welcomeUser.innerHTML = `Hola ${username}`
    }
}

const Init = async() => {
    validateUsername();
    await getProducts();
    showAllProducts();

    const cartStored = JSON.parse(sessionStorage.getItem("cart")) //Pasamos el String a objeto 
    // y obtenemos el valor guardado bajo la clave "carrito"

    if (cartStored) { //si existe el carrito guardado
        cart = cartStored //reemplazamos la variable global "carrito" por el carrito recuperado del localStorag
        //  y restauramos el estado del carrito al cargar la pagina
    }
}

Init()